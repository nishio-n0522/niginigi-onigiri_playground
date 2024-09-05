import json
import openai

import boto3
from botocore.exceptions import ClientError
from aws_lambda_powertools.utilities import parameters
import uuid

SECRET_NAME = "niginigi-onigiri_playground_api"
REGION_NAME = "ap-northeast-1"

OPENAI_SECRET_NAME = "openai-api-key"
CLAUDE_SECRET_NAME = "claude-api-key"

SQS_URL_KEY = "/niginigi-onigiri_api/async_sqs_url"

def get_secret():

    # Create a Secrets Manager client
    session = boto3.session.Session()
    client = session.client(
        service_name='secretsmanager',
        region_name=REGION_NAME
    )

    try:
        get_secret_value_response = client.get_secret_value(
            SecretId=SECRET_NAME
        )
    except ClientError as e:
        raise e

    secret = json.loads(get_secret_value_response['SecretString'])
    return secret

def lambda_handler(event, context):

    # secret = get_secret()
    # openai.api_key = secret[OPENAI_SECRET_NAME]

    # response = openai.chat.completions.create(
    #     model="gpt-4o-mini",  # 使用するモデル
    #     messages=[
    #     {"role": "system", "content": "あなたは小学校の先生です。"},
    #     {"role": "user", "content": "生成AIの仕組みを小学生にもわかるように200字以内で回答してください。"}
    #     ]
    # )

    dedup_id = str(uuid.uuid4())

    sqs = boto3.client("sqs")
    sqs_url = parameters.get_parameter(SQS_URL_KEY)
    response = sqs.send_message(QueueUrl=sqs_url, MessageBody="test1", MessageGroupId="test", MessageDeduplicationId=dedup_id)
    print("response", response)

    return {
        "statusCode": 200,
        "headers": {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "http://localhost:3000",
            "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
            "Access-Control-Allow-Methods": "DELETE,GET,HEAD,OPTIONS,PATCH,POST,PUT",
            "Access-Control-Allow-Credentials": True
        },
        "body": json.dumps({
            "message": "test"
            # "message": response.choices[0].message.content
        }, ensure_ascii=False),
    }
