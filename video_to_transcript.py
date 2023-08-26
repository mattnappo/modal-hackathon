import whisper
from pytube import YouTube, Channel
import pandas as pd


def main(args):
    video_url = args.video

    audio_file = YouTube(video_url).streams.filter(
        only_audio=True).first().download(filename="audio.mp4") # can make a temp folder to download it

    whisper_model = whisper.load_model("tiny") # may replace with llama cpp if the quality is not good
    transcription = whisper_model.transcribe(audio_file)

    # seperates the segments into a df rn; will connect it to mongo db
    df = pd.DataFrame(data=transcription['segments'], columns=[
        'start', 'end', 'text'])

    print(df)
    print(transcription)


if __name__ == "__main__":

    from argparse import ArgumentParser
    from pathlib import Path

    parser = ArgumentParser(description=__doc__)
    parser.add_argument('--video', type=str, required=True,
                        help="YouTube video URL")
    args = parser.parse_args()
    main(args)