import os
import json
import uuid

from jsonschema import validate, ValidationError
from openai import OpenAI

import boto3
from aws_lambda_powertools import Logger
from aws_lambda_powertools.utilities import parameters
from aws_lambda_powertools.utilities.parameters import SecretsProvider

# CONSTANT
DYNAMODB_EXPERIMENTTABLE_NAME = "/niginigi-onigiri_playground/dynamodb_dev/experimental_data"
TEST_BUCKET = "amplify-amplifynextpagestem-userdatabucket5603603e-f0sfxqvqcnxi"
SECRET_NAME = "niginigi-onigiri_playground_api"
OPENAI_SECRET_NAME = "openai-api-key"

logger = Logger()

speech_to_text_sqs_body_schema = {
    "type": "object",
    "properties": {
        "audio_file_path": {"type": "string"}
    }
}

def get_secret():
    # get secret
    secrets_provider = SecretsProvider()
    return json.loads(secrets_provider.get(SECRET_NAME))

# ここでやること: SQSに記述された内容に基づいて音声ファイルをテキスト化し、英 → 日変換を実施する。その結果をDBへ保存して、処理が終わればフロントの表示が変わるようにする。
# 手順
# 1. SQSから受け取ったメッセージを解読
# 2. メッセージに基づく音声ファイルをs3から取得し、lambdaの/tmp配下に一時保存
# 3. それぞれの音声ファイルに対して、chatgptのwhisper apiを利用してtranscriptionを実施
# 4. transcription結果を、gpt-4o-miniで要約する
# 5. 要約結果をs3もしくはdynamodbに保存する

client_s3 = boto3.client("s3")


client_openai = OpenAI(api_key = get_secret()[OPENAI_SECRET_NAME])


def download_file(key, download_path):
    client_s3.download_file(Bucket=TEST_BUCKET, Key=key, Filename=download_path)

def speech_to_text(record):

    # 1. SQSから受け取ったメッセージを解読
    # sqsから渡されたメッセージのbodyの中に、処理するための情報が格納されているので取り出す。
    # bodyのスキーマは後で作成
    body = json.loads(record["body"])

    # 2. メッセージに基づく音声ファイルをs3から取得し、lambdaの/tmp配下に一時保存
    file_name = os.path.basename(body["filePath"])
    _, extention = os.path.splitext(file_name)
    tmp_input = f"/tmp/{str(uuid.uuid4())}{extention}"
    try:
        download_file(body["filePath"], tmp_input)
    except Exception as e:
        print(e)

    # 3. それぞれの音声ファイルに対して、chatgptのwhisper apiを利用してtranscriptionを実施
    audio_file = open(tmp_input, "rb")
    transcription = client_openai.audio.transcriptions.create(
        model="whisper-1",
        file=audio_file
    )
    print(transcription.text)

    # TODO
    # 4. transcription結果を、gpt-4o-miniで要約する
    
    

# TOBE: 話者分離機能を入れる
def lambda_handler(event, context):

    # logger.info("execute async processing lambda!!!")
    
    records = event["Records"]

    # logger.info(event)

    for record in records:
        try:
            speech_to_text(record)
        except Exception as e:
            logger.error(e)

        

    # table_name = parameters.get_parameter(DYNAMODB_EXPERIMENTTABLE_NAME)

    # client = boto3.client('dynamodb')

    # # update
    # response = client.update_item(
    #     TableName=table_name,
    #     Key={"owner": {"S": "d794ba08-90c1-70e8-f52a-224d200086c7"}, "experimentName": {"S": "test"}},
    #     ExpressionAttributeNames={
    #         "#s": "status"
    #     },
    #     ExpressionAttributeValues={
    #         ":newStatus": {"S": "Processing"}
    #     },
    #     UpdateExpression="SET #s = :newStatus"
    # )