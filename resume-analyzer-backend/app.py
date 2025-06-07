from fastapi import FastAPI, UploadFile, File, Form, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import uvicorn
import tempfile
import os
import uuid
import json
import fitz  # PyMuPDF
import docx2txt
import mimetypes
from google.generativeai import GenerativeModel
import google.generativeai as genai
from PIL import Image
from io import BytesIO
from resume_analyzer import ResumeAnalyzer
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configure Google AI
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY", "AIzaSyCY9tnrZXjEWJMlU39Y6Znd3eMnFQLBbI8")  # Use env var as default
genai.configure(api_key=GOOGLE_API_KEY)

# Initialize Gemini Vision model
vision_model = genai.GenerativeModel("gemini-2.0-flash")

# Initialize FastAPI
app = FastAPI(title="Resume Analyzer API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For production, specify your frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize resume analyzer
analyzer = ResumeAnalyzer()

# In-memory storage for analysis results
analysis_results = {}

# Resume parsing functions
def parse_docx(file_path):
    return docx2txt.process(file_path)

def parse_pdf_text(file_path):
    text = ""
    with fitz.open(file_path) as doc:
        for page in doc:
            text += page.get_text()
    return text.strip()

def extract_text_from_image_or_scanned_pdf(file_path):
    # For scanned PDFs, take a screenshot of each page and send to Gemini
    images = []
    if file_path.endswith(".pdf"):
        with fitz.open(file_path) as doc:
            for page in doc:
                pix = page.get_pixmap(dpi=300)
                img_bytes = pix.tobytes("png")
                image = Image.open(BytesIO(img_bytes))
                images.append(image)
    else:
        image = Image.open(file_path)
        images.append(image)

    text = ""
    for img in images:
        response = vision_model.generate_content(
            [img, "Extract the text content from this resume image for structured analysis."]
        )
        text += response.text + "\n"
    return text.strip()

def get_text_from_resume(file_path):
    mime, _ = mimetypes.guess_type(file_path)
    if mime:
        if "pdf" in mime:
            text = parse_pdf_text(file_path)
            if len(text.strip()) < 100:  # Very low text — possibly scanned
                text = extract_text_from_image_or_scanned_pdf(file_path)
        elif "word" in mime or file_path.endswith(".docx"):
            text = parse_docx(file_path)
        elif mime.startswith("image/"):
            text = extract_text_from_image_or_scanned_pdf(file_path)
        else:
            raise ValueError("Unsupported file type.")
    else:
        raise ValueError("Unable to determine file type.")
    return text.strip()

def structure_resume_text_to_json(resume_text):
    prompt = f"""
You are a resume parser AI. Convert the following resume text into structured JSON with these sections:
education, experience, skills, projects, certifications (if any), achievements (if any), leadership (if any). Be accurate.

Resume Text:
\"\"\"
{resume_text}
\"\"\"
Return only JSON.
"""
    model = genai.GenerativeModel("gemini-2.0-flash")
    response = model.generate_content(prompt)
    return response.text

def parse_resume(file_path):
    raw_text = get_text_from_resume(file_path)
    structured_json = structure_resume_text_to_json(raw_text)
    # Clean up the output if it starts/ends with code block markers
    cleaned = structured_json.strip()
    if cleaned.startswith('```json'):
        cleaned = cleaned[len('```json'):].strip()
    if cleaned.startswith('```'):
        cleaned = cleaned[len('```'):].strip()
    if cleaned.endswith('```'):
        cleaned = cleaned[:-3].strip()
    # Parse and return the JSON as a Python dict
    return json.loads(cleaned), raw_text

@app.post("/analyze-resume")
async def analyze_resume(
    background_tasks: BackgroundTasks,
    resume_file: UploadFile = File(...),
    job_description: str = Form(None)
):
    """
    Endpoint to upload and analyze a resume
    Returns an analysis ID for fetching results when analysis is complete
    """
    # Check file type
    allowed_extensions = ['.pdf', '.docx', '.doc', '.jpg', '.jpeg', '.png']
    file_ext = os.path.splitext(resume_file.filename)[1].lower()
    
    if file_ext not in allowed_extensions:
        raise HTTPException(
            status_code=400, 
            detail=f"Invalid file format. Supported formats: {', '.join(allowed_extensions)}"
        )
    
    # Generate unique ID for this analysis
    analysis_id = str(uuid.uuid4())
    
    # Save uploaded file temporarily
    with tempfile.NamedTemporaryFile(delete=False, suffix=file_ext) as temp_file:
        temp_file_path = temp_file.name
        file_content = await resume_file.read()
        temp_file.write(file_content)
    
    # Store initial status
    analysis_results[analysis_id] = {
        "status": "processing",
        "filename": resume_file.filename,
        "parsed_resume": None,
        "analysis": None
    }
    
    # Process file in background
    background_tasks.add_task(
        process_resume, 
        temp_file_path, 
        analysis_id, 
        resume_file.filename,
        job_description
    )
    
    return {
        "status": "processing",
        "analysis_id": analysis_id,
        "message": "Resume uploaded and being processed. Check status with the analysis_id."
    }

async def process_resume(file_path, analysis_id, filename, job_description):
    """Background task to process resume"""
    try:
        # Parse resume using our parser
        structured_data, raw_text = parse_resume(file_path)
        
        # Format the parsed data to match the expected structure for the analyzer
        parsed_resume = {
            "raw_content": raw_text,
            "metadata": {
                "filename": filename,
                "parser": "gemini"
            },
            "sections": structured_data
        }
        
        if not parsed_resume:
            analysis_results[analysis_id] = {
                "status": "error",
                "filename": filename,
                "error": "Failed to parse resume"
            }
            return
        
        # Analyze resume
        analysis_result = analyzer.analyze_full_resume(parsed_resume, job_description)
        
        # Store result
        analysis_results[analysis_id] = {
            "status": "completed",
            "filename": filename,
            "parsed_resume": parsed_resume,
            "analysis": analysis_result
        }
    except Exception as e:
        analysis_results[analysis_id] = {
            "status": "error",
            "filename": filename,
            "error": str(e)
        }
    finally:
        # Clean up temporary file
        try:
            os.unlink(file_path)
        except:
            pass

@app.get("/analysis/{analysis_id}")
async def get_analysis_result(analysis_id: str):
    """Fetch the result of a resume analysis by ID"""
    if analysis_id not in analysis_results:
        raise HTTPException(status_code=404, detail="Analysis not found")
    
    return analysis_results[analysis_id]

@app.delete("/analysis/{analysis_id}")
async def delete_analysis(analysis_id: str):
    """Delete an analysis result"""
    if analysis_id not in analysis_results:
        raise HTTPException(status_code=404, detail="Analysis not found")
    
    del analysis_results[analysis_id]
    return {"message": "Analysis deleted successfully"}

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy"}

if __name__ == "__main__":
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)