import json
import uuid

import openai
from anthropic import Anthropic

import boto3
from aws_lambda_powertools import Logger
from aws_lambda_powertools.event_handler import APIGatewayRestResolver
from aws_lambda_powertools.utilities import parameters
from aws_lambda_powertools.utilities.typing import LambdaContext
from aws_lambda_powertools.utilities.parameters import SecretsProvider

# CONSTANT
SECRET_NAME = "niginigi-onigiri_playground_api"
REGION_NAME = "ap-northeast-1"
OPENAI_SECRET_NAME = "openai-api-key"
CLAUDE_SECRET_NAME = "claude-api-key"
SQS_URL_KEY = "/niginigi-onigiri_api/async_sqs_url"


logger = Logger()
app = APIGatewayRestResolver()

def test():
    # send message
    dedup_id = str(uuid.uuid4())
    sqs = boto3.client("sqs")
    sqs_url = parameters.get_parameter(SQS_URL_KEY)
    response = sqs.send_message(QueueUrl=sqs_url, MessageBody="test1", MessageGroupId="test", MessageDeduplicationId=dedup_id)
    print("response", response)

    # get secret
    secrets_provider = SecretsProvider()
    secrets = json.loads(secrets_provider.get(SECRET_NAME))
    print(secrets[OPENAI_SECRET_NAME])

    # execute openai chat
    openai.api_key = secrets[OPENAI_SECRET_NAME]
    response = openai.chat.completions.create(
        model="gpt-4o-mini",  # 使用するモデル
        messages=[
        {"role": "system", "content": "あなたは小学校の先生です。"},
        {"role": "user", "content": "生成AIの仕組みを小学生にもわかるように200字以内で回答してください。"}
        ]
    )
    chat_result = response.choices[0].message.content

    # execute claude
    anthropic = Anthropic(api_key=secrets[CLAUDE_SECRET_NAME])
    message = anthropic.messages.create(
        max_tokens=1024,
        model="claude-3-5-sonnet-20240620",
        messages=[
            {
                "role": "user", 
                "content": "こんにちは、Claude。量子コンピューターの仕組みを小学生にもわかるように200字以内で回答してください。"
            }
        ]
    )
    chat_result = message.content[0].text

    return 

@app.get("/test")
def get_test():
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
            "message": "execute get test"
        }, ensure_ascii=False),
    }

@logger.inject_lambda_context(log_event=True)
def lambda_handler(event: dict, context: LambdaContext) -> dict:
    return app.resolve(event, context)
