from typing import Union

from fastapi import FastAPI
import json
import uvicorn
from fastapi.responses import JSONResponse


from insights.transcript import transcribe_video
import modal
app = FastAPI()

@app.get("/insights/")
def transcribe_url(url: str):
    return transcribe_video(url)

@app.get("/marketSearch")
def search_topic(prompt: str):
    run = modal.Function.lookup("market-research", "run")
    return json.dumps(run.remote(prompt))
    # return "hi"

if __name__ == "__main__":
    uvicorn.run("server:app", port=5000, log_level="info")
