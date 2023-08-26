from typing import Union

from fastapi import FastAPI
import json
import uvicorn
from insights.transcript import transcribe_video
import modal
app = FastAPI()

@app.get("/insights/")
def transcribe_url(url: str):
    return json.dumps(transcribe_video(url))

@app.get("/marketSearch")
def search_topic(prompt: str):
    run = modal.Function.lookup("market-research", "run")
    return json.dumps(run.remote(prompt))

if __name__ == "__main__":
    uvicorn.run("api:app", port=5000, log_level="info")