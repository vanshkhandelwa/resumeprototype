# Use an official Python image for the backend
FROM python:3.11-slim

# Set work directory
WORKDIR /app

# Install OS dependencies for PyMuPDF
RUN apt-get update && apt-get install -y \
    build-essential \
    libmupdf-dev \
    tesseract-ocr \
    poppler-utils \
    && rm -rf /var/lib/apt/lists/*

# Copy backend code
COPY resume-analyzer-backend/ ./resume-analyzer-backend/
WORKDIR /app/resume-analyzer-backend

# Install Python dependencies
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# Build React frontend
WORKDIR /app
COPY frontend/ ./frontend/
WORKDIR /app/frontend
RUN apt-get update && apt-get install -y nodejs npm
RUN npm install
RUN npm run build

# Copy built frontend to backend if needed
WORKDIR /app/resume-analyzer-backend
RUN mkdir -p static && cp -r /app/frontend/build/* static/

# Expose the port your backend runs on (change if needed)
EXPOSE 5000

# Start the backend
CMD ["python", "app.py"]
