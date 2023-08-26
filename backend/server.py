from typing import Union

from fastapi import FastAPI
import json
import uvicorn
from insights.transcript import transcribe_video
import modal
app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/transcribe/")
def transcribe_url(url: str):
    return json.dumps(transcribe_video(url))

@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    
    return {"item_id": item_id, "q": q}

@app.get("/search")
def search_topic(prompt: str):
    run = modal.Function.lookup("market-research", "run")
    return json.dumps(run.remote(prompt))

if __name__ == "__main__":
    uvicorn.run("api:app", port=5000, log_level="info")