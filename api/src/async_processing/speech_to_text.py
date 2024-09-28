import os
from pathlib import Path

import torch
from pyannote.audio import Pipeline
from pydub import AudioSegment

cache_dir = "./api/dependencies/python/.cache/torch/pyannote"
checkpoint_path = "/models--pyannote--speaker-diarization-3.1/snapshots/84fd25912480287da0247647c3d2b4853cb3ee5d/config.yaml"

def convert_to_wav(path: str):
    target_path = Path(path)

    if not target_path.exists():
        FileExistsError()
        return
        
    audio: AudioSegment = AudioSegment.from_file(target_path, format="m4a")
    audio.export("audio_truck/output/"+ target_path.stem + ".wav", format="wav")

def annotate_speaker_ver1(path):
    recognization_speaker = []

    
    pipeline = Pipeline.from_pretrained(checkpoint_path=cache_dir+checkpoint_path, hparams_file=cache_dir+checkpoint_path, cache_dir=cache_dir)

    pipeline.to(torch.device("cpu"))
    diarization = pipeline(path)

    previous_speaker = None
    previous_time = 0

    for turn, _, speaker in diarization.itertracks(yield_label=True):
        if previous_speaker is None:
            previous_speaker = speaker

        if speaker is not None and speaker != previous_speaker:
            recognization_speaker.append([previous_speaker, previous_time, turn.end])
            previous_speaker = speaker
            previous_time = turn.end

    recognization_speaker.append([previous_speaker, previous_time, turn.end])

    return recognization_speaker

if __name__=='__main__':
    print(os.getcwd())
    
    result = annotate_speaker_ver1("C:/Users/nishi/music/test.wav")

    print(result)
