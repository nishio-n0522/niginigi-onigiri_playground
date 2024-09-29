import os
import logging
import uuid
from pathlib import Path
import subprocess
import json

import boto3
from pydub import AudioSegment


logger = logging.getLogger(__name__)

TEST_BUCKET = "niginigi-onigiri-test-bucket"

client = boto3.client("s3")

# def convert_to_wav(path: str):
#     target_path = Path(path)

#     if not target_path.exists():
#         FileExistsError()
#         return
        
#     audio: AudioSegment = AudioSegment.from_file(target_path, format="m4a")
#     audio.export("audio_truck/output/"+ target_path.stem + ".wav", format="wav")

def download_file(key, download_path):
    client.download_file(Bucket=TEST_BUCKET, Key=key, Filename=download_path)

def upload_file(file_path, key):
    client.put_object(Filename=file_path, Bucket=TEST_BUCKET, Key=key)

def convert_m4a_to_wav(input_path, output_path):
    subprocess.call(['ffmpeg', '-i', input_path, output_path])

def lambda_handler(event, context):
    logger.info("Start async processing")
    logger.info("current directory: ", os.getcwd())

    target_file_key = "test_folder/sample_speech.m4a"
    tmp_input = f"/tmp/{str(uuid.uuid4())}.m4a"
    tmp_output = f"/tmp/{str(uuid.uuid4())}.wav"

    try:
        print("ダウンロードの実行")
        download_file(target_file_key, tmp_input)
        print("ダウンロードの完了", "ファイル形式の変換の開始")
        convert_m4a_to_wav(tmp_input, tmp_output)
        print("ファイル形式変換の完了", "ファイルアップロードの開始")
        upload_file(tmp_output, "test_folder/sample_speech.wav")
        print("アップロードの完了")

        return {
            'statusCode': 200,
            'body': json.dumps('Audio conversion successful')
        }
    except Exception as e:
        print("エラーの発生", e)
        return {
            'statusCode': 500,
            'body': json.dumps('Error in audio conversion')
        }
    finally:
        # 一時ファイルを削除(ローカルデバッグ用)
        if os.path.exists(tmp_input):
            os.remove(tmp_input)
        if os.path.exists(tmp_output):
            os.remove(tmp_output)