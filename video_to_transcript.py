'''
Super inefficent rn...
1. use a temp file for the downloaded audio
'''

import whisper
from pytube import YouTube
from youtubesearchpython import VideosSearch
import json

from tqdm import tqdm, trange

class Transcript:
    def __init__(self, video_title, url, date, segments=None):
        self.video_title = video_title
        self.url = url
        self.date = date
        self.segments = segments if segments is not None else []

    def add_segment(self, start, end, text):
        segment = {
            "start": start,
            "end": end,
            "text": text
        }
        self.segments.append(segment)

    def __str__(self):
        return f"Transcript for '{self.video_title}' ({self.date})"

    def to_dict(self):
        return {
            "video_title": self.video_title,
            "url": self.url,
            "date": self.date,
            "segments": self.segments
        }

# input: topic -> list of youtube urls on the topic
def search_videos(topic):
    videosSearch = VideosSearch(topic, limit=2) # need to experiment with limit
    results = videosSearch.result()['result']
    return [(result['title'], result['link'], result['publishedTime']) for result in results] # a list of youtube links

# input: video_url -> list of transcribed segments
def transcribe_video(video_url):
    audio_file = YouTube(video_url).streams.filter(
        only_audio=True).first().download(filename="audio.mp4") # can make a temp folder to download it

    whisper_model = whisper.load_model("tiny") # may replace with llama cpp if the quality is not good
    
    transcription = whisper_model.transcribe(audio_file)
    segments = []
    for i in trange(len(transcription['segments'])):
        segments.append(transcription['segments'][i]['text']) # append the text
    
    return segments

def build_transcripts(topic):
    transcripts = []
    print('----Searching Videos...-----')
    vid_search = search_videos(topic)
    print('----Transcribing Videos...-----')
    for title, link, date in tqdm(vid_search):
        segments = transcribe_video(link)
        t = Transcript(title, link, date, segments)
        transcripts.append(t)
    return transcripts
         
if __name__ == "__main__":
    topic = input("Input a topic to gather videos on: ")
    transcripts_json = json.dumps([t.to_dict() for t in build_transcripts(topic)])
    
    with open("data.json", "w") as outfile:
        outfile.write(transcripts_json)
