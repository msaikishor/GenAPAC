# Multi-Agent AI System

A production-ready multi-agent AI system built with FastAPI and SQLite.

## Local Execution

1. Make sure you have Python 3.11+ installed.
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Run the API:
   ```bash
   uvicorn app.main:app --host 0.0.0.0 --port 8080 --reload
   ```
4. Access the API documentation at `http://localhost:8080/docs`.

### Example API Request

```bash
curl -X 'POST' \
  'http://localhost:8080/run-workflow' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "goal": "Prepare for Python interview in 7 days"
}'
```

## Google Cloud Run Deployment

1. Make sure you have Docker installed and the Google Cloud CLI (`gcloud`) authenticated.
2. Build and submit your container:
   ```bash
   gcloud builds submit --tag gcr.io/YOUR_PROJECT_ID/multi-agent-api
   ```
3. Deploy to Cloud Run:
   ```bash
   gcloud run deploy multi-agent-api \
     --image gcr.io/YOUR_PROJECT_ID/multi-agent-api \
     --platform managed \
     --region us-central1 \
     --allow-unauthenticated \
     --port 8080
   ```

## Frontend Application

A React-based UI is available in the `frontend` directory.

1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Access the UI at `http://localhost:5173`.
