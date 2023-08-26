'''
Super inefficent rn...
1. use a temp file for the downloaded audio
'''

import whisper
from pytube import YouTube
# from youtubesearchpython import VideosSearch
# import json

from tqdm import tqdm, trange

class Transcript:
    def __init__(self, title, segments=None):
        self.title = title
        self.segments = segments if segments is not None else []

    def __str__(self):
        return f"Transcript for '{self.title}'"

    def to_dict(self):
        return {
            "title": self.title,
            "segments": self.segments
        }

# input: video_url -> transcript object
def transcribe_video(video_url):
    yt = YouTube(video_url)
    audio_file = YouTube(video_url).streams.filter(
        only_audio=True).first().download(filename="audio.mp4") # can make a temp folder to download it

    whisper_model = whisper.load_model("tiny") # may replace with llama cpp if the quality is not good
    
    transcription = whisper_model.transcribe(audio_file)
    segments = []
    for i in trange(len(transcription['segments'])):
        segments.append(transcription['segments'][i]['text']) # append the text
    
    return Transcript(title=yt.title, segments=segments).to_dict()