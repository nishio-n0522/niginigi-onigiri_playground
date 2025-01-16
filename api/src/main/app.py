import time
import json
import uuid
from jsonschema import validate, ValidationError

import requests
from requests import Response

import openai
from anthropic import Anthropic

import boto3
from aws_lambda_powertools import Logger
from aws_lambda_powertools.event_handler import APIGatewayRestResolver, CORSConfig, Response, content_types
from aws_lambda_powertools.event_handler.openapi.exceptions import RequestValidationError
from aws_lambda_powertools.utilities import parameters
from aws_lambda_powertools.utilities.typing import LambdaContext
from aws_lambda_powertools.utilities.parameters import SecretsProvider
from aws_lambda_powertools.logging import correlation_paths

# CONSTANT
SECRET_NAME = "niginigi-onigiri_playground_api"
REGION_NAME = "ap-northeast-1"
OPENAI_SECRET_NAME = "openai-api-key"
CLAUDE_SECRET_NAME = "claude-api-key"
SQS_URL_KEY = "/niginigi-onigiri_api/speech_to_text_sqs_url"

logger = Logger()
cors_config = CORSConfig(allow_origin="https://niginigi-onigiri.studio", 
                         extra_origins=["http://localhost:3000"],
                         allow_credentials=True
                         )
app = APIGatewayRestResolver(strip_prefixes=["/v1"], cors=cors_config)

@app.get("/test")
def get_test():
    # todos = requests.get(f"https://jsonplaceholder.typicode.com/todos/1")
    # todos.raise_for_status()
    # t0 = time.perf_counter()
    result = exec_llm()
    return {"todos": result}

@app.exception_handler(RequestValidationError)  
def handle_validation_error(ex: RequestValidationError):
    logger.error("Request failed validation", path=app.current_event.path, errors=ex.errors())
    return Response(
        status_code=422,
        content_type=content_types.APPLICATION_JSON,
        body="Invalid data",
    )

@app.get("/gen-ai")
def get_gen_ai_resources():
    return {"gen_ai_resources": ["funcA", "funcB"]}

# ここでやること: SQSでbackend用のlambdaにspeech-to-textの処理をさせて、フロントには一旦処理を返す。
@app.post("/gen-ai/speech-to-text")
def speech_to_text():

    print(app.current_event.json_body)
    
    # send message
    dedup_id = str(uuid.uuid4())
    sqs = boto3.client("sqs")
    sqs_url = parameters.get_parameter(SQS_URL_KEY)
    response = sqs.send_message(QueueUrl=sqs_url, MessageBody=json.dumps({"data1": "test1", "data2": 123, "data3": True, "data4": ["aaa", "bbb"], "data5": {"data1": 133}}), MessageGroupId="test", MessageDeduplicationId=dedup_id)
    # print("response", response)

    return {"result": "your order is processing at background."}


@logger.inject_lambda_context(correlation_id_path=correlation_paths.API_GATEWAY_REST)
def lambda_handler(event: dict, context: LambdaContext) -> dict:
    return app.resolve(event, context)


def get_secret():
    # get secret
    secrets_provider = SecretsProvider()
    return json.loads(secrets_provider.get(SECRET_NAME))


def exec_llm():
    # execute openai chat
    openai.api_key = get_secret()[OPENAI_SECRET_NAME]
    response = openai.chat.completions.create(
        model="gpt-4o-mini",  # 使用するモデル
        messages=[
            {"role": "system", "content": "あなたは小学校の先生です。"},
            {"role": "user", "content": "生成AIの仕組みを小学生にもわかるように200字以内で回答してください。"}
        ]
    )
    chat_result = response.choices[0].message.content

    # execute claude
    # anthropic = Anthropic(api_key=secrets[CLAUDE_SECRET_NAME])
    # message = anthropic.messages.create(
    #     max_tokens=1024,
    #     model="claude-3-5-sonnet-20240620",
    #     messages=[
    #         {
    #             "role": "user", 
    #             "content": "こんにちは、Claude。量子コンピューターの仕組みを小学生にもわかるように200字以内で回答してください。"
    #         }
    #     ]
    # )
    # chat_result = message.content[0].text

    return chat_result

def exec_whisper(file_path):
    openai.api_key = get_secret()[OPENAI_SECRET_NAME]

    client = openai.OpenAI()
    open(file_path, "rb")
