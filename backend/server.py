from typing import Union

from fastapi import FastAPI
import uvicorn

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/insights")
def get_insights(url: str):
    res = {
        'title': 'some video title',
        'url': url,
        'text': ['str1', 'str2', 'str3']
    }

    return res

@app.get("/marketSearch")
def get_marketsearch(prompt: str):
    res = {
        'prompt': prompt,
        'bulletPoints': ['the market is good', 'the market is amazing'],
    }

    return res

if __name__ == "__main__":
    uvicorn.run("server:app", port=5000, log_level="info")
