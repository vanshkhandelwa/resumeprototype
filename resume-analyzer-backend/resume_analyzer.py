import os
import google.generativeai as genai
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configure Google AI
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY", "AIzaSyCY9tnrZXjEWJMlU39Y6Znd3eMnFQLBbI8")  # Use env var as default
genai.configure(api_key=GOOGLE_API_KEY)

class ResumeAnalyzer:
    def __init__(self):
        self.model = genai.GenerativeModel("gemini-2.0-flash")
    
    def analyze_full_resume(self, parsed_resume, job_description=None):
        """
        Analyze the full resume and return comprehensive insights
        
        Args:
            parsed_resume (dict): The parsed resume data containing sections and raw content
            job_description (str, optional): The job description to compare with
            
        Returns:
            dict: Analysis results including overall score, section scores, and recommendations
        """
        # Extract sections from the parsed resume
        sections = parsed_resume["sections"]
        resume_text = parsed_resume["raw_content"]
        
        # Analyze each section
        analysis_results = {
            "overall": self._analyze_overall_fit(resume_text, job_description),
            "sections": {}
        }
        
        # Analyze individual sections
        for section_name, section_content in sections.items():
            if section_content:  # Only analyze non-empty sections
                section_analysis = self._analyze_section(section_name, section_content, job_description)
                if section_analysis:
                    analysis_results["sections"][section_name] = section_analysis
        
        # Generate suggestions for improvement
        analysis_results["suggestions"] = self._generate_suggestions(resume_text, job_description)
        
        return analysis_results
    
    def _analyze_overall_fit(self, resume_text, job_description):
        """Analyze overall resume fit and quality"""
        prompt = self._create_overall_analysis_prompt(resume_text, job_description)
        response = self.model.generate_content(prompt)
        
        try:
            # Parse the response to structured data
            analysis_text = response.text
            # Clean up the output if it starts/ends with code block markers
            cleaned = analysis_text.strip()
            if cleaned.startswith('```json'):
                cleaned = cleaned[len('```json'):].strip()
            if cleaned.startswith('```'):
                cleaned = cleaned[len('```'):].strip()
            if cleaned.endswith('```'):
                cleaned = cleaned[:-3].strip()
            
            import json
            return json.loads(cleaned)
        except Exception as e:
            print(f"Error parsing overall analysis response: {str(e)}")
            # Return a fallback structure
            return {
                "score": 70,
                "summary": "Unable to generate detailed analysis. Please review the resume manually.",
                "strengths": ["Unable to determine strengths"],
                "weaknesses": ["Unable to determine weaknesses"],
                "recommendations": ["Unable to generate specific recommendations"]
            }
    
    def _analyze_section(self, section_name, section_content, job_description):
        """Analyze a specific section of the resume"""
        prompt = self._create_section_analysis_prompt(section_name, section_content, job_description)
        response = self.model.generate_content(prompt)
        
        try:
            # Parse the response to structured data
            analysis_text = response.text
            # Clean up the output if it starts/ends with code block markers
            cleaned = analysis_text.strip()
            if cleaned.startswith('```json'):
                cleaned = cleaned[len('```json'):].strip()
            if cleaned.startswith('```'):
                cleaned = cleaned[len('```'):].strip()
            if cleaned.endswith('```'):
                cleaned = cleaned[:-3].strip()
            
            import json
            return json.loads(cleaned)
        except Exception as e:
            print(f"Error parsing section analysis response for {section_name}: {str(e)}")
            # Return a fallback structure
            return {
                "score": 70,
                "strengths": ["Unable to determine strengths"],
                "weaknesses": ["Unable to determine weaknesses"],
                "improvement_suggestions": ["Unable to generate specific suggestions"]
            }
    
    def _generate_suggestions(self, resume_text, job_description):
        """Generate suggestions for resume improvement"""
        prompt = self._create_suggestions_prompt(resume_text, job_description)
        response = self.model.generate_content(prompt)
        
        try:
            # Parse the response to structured data
            suggestions_text = response.text
            # Clean up the output if it starts/ends with code block markers
            cleaned = suggestions_text.strip()
            if cleaned.startswith('```json'):
                cleaned = cleaned[len('```json'):].strip()
            if cleaned.startswith('```'):
                cleaned = cleaned[len('```'):].strip()
            if cleaned.endswith('```'):
                cleaned = cleaned[:-3].strip()
            
            import json
            return json.loads(cleaned)
        except Exception as e:
            print(f"Error parsing suggestions response: {str(e)}")
            # Return a fallback structure
            return {
                "content_suggestions": ["Unable to generate content suggestions"],
                "format_suggestions": ["Unable to generate format suggestions"],
                "general_suggestions": ["Unable to generate general suggestions"]
            }
    
    def _create_overall_analysis_prompt(self, resume_text, job_description):
        """Create prompt for overall resume analysis"""
        job_desc_text = f"\nJob Description:\n{job_description}" if job_description else ""
        prompt = f"""
Analyze this resume{job_desc_text} and provide an overall assessment in JSON format.

Resume:
\"\"\"
{resume_text}
\"\"\"

Evaluate the resume on clarity, relevance, presentation, and impact. If a job description is provided, assess alignment.

Return only a JSON object with these exact fields:
- score: numerical score from 0-100
- summary: brief overall assessment
- strengths: array of 3-5 strongest points
- weaknesses: array of 3-5 areas for improvement
- recommendations: array of 3-5 specific recommendations

Only return valid JSON - no markdown formatting, comments, explanations or text outside the JSON object.
"""
        return prompt
    
    def _create_section_analysis_prompt(self, section_name, section_content, job_description):
        """Create prompt for section analysis"""
        job_desc_text = f"\nJob Description:\n{job_description}" if job_description else ""
        
        # Convert section_content to string if it's not already
        if isinstance(section_content, list):
            section_content = "\n".join([str(item) for item in section_content])
        elif not isinstance(section_content, str):
            section_content = str(section_content)
        
        prompt = f"""
Analyze the {section_name} section of this resume{job_desc_text} and provide assessment in JSON format.

{section_name.upper()} SECTION:
\"\"\"
{section_content}
\"\"\"

Return only a JSON object with these exact fields:
- score: numerical score from 0-100
- strengths: array of 2-4 strengths of this section
- weaknesses: array of 2-4 areas for improvement in this section
- improvement_suggestions: array of 2-4 specific suggestions

Only return valid JSON - no markdown formatting, comments, explanations or text outside the JSON object.
"""
        return prompt
    
    def _create_suggestions_prompt(self, resume_text, job_description):
        """Create prompt for generating improvement suggestions"""
        job_desc_text = f"\nJob Description:\n{job_description}" if job_description else ""
        prompt = f"""
Generate specific, actionable suggestions to improve this resume{job_desc_text}. Return in JSON format.

Resume:
\"\"\"
{resume_text}
\"\"\"

Return only a JSON object with these exact fields:
- content_suggestions: array of 3-5 suggestions to improve content
- format_suggestions: array of 2-3 suggestions to improve formatting
- general_suggestions: array of 2-3 general improvement tips

Each suggestion should be specific, actionable, and tailored to this resume.

Only return valid JSON - no markdown formatting, comments, explanations or text outside the JSON object.
"""
        return prompt

# Usage example (for testing)
if __name__ == "__main__":
    # Sample data for testing
    sample_parsed_resume = {
        "raw_content": "John Doe\nSoftware Engineer\n\nExperience:\nABC Company - Senior Developer (2020-Present)\nXYZ Corp - Junior Developer (2018-2020)\n\nEducation:\nBS Computer Science, University of Example (2018)",
        "metadata": {"filename": "sample_resume.pdf"},
        "sections": {
            "experience": ["ABC Company - Senior Developer (2020-Present)", "XYZ Corp - Junior Developer (2018-2020)"],
            "education": ["BS Computer Science, University of Example (2018)"],
            "skills": ["Python", "JavaScript", "React", "Node.js"]
        }
    }
    
    sample_job_description = "Looking for a Senior Software Engineer with 3+ years of experience in Python and JavaScript. React experience preferred."
    
    # Initialize analyzer and run test analysis
    analyzer = ResumeAnalyzer()
    result = analyzer.analyze_full_resume(sample_parsed_resume, sample_job_description)
    
    # Print results (for testing)
    import json
    print(json.dumps(result, indent=2))