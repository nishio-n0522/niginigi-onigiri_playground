import json
import openai
from anthropic import Anthropic


import boto3
from botocore.exceptions import ClientError

def get_secret():

    secret_name = "my-claude-api-key"
    region_name = "ap-northeast-1"

    # Create a Secrets Manager client
    session = boto3.session.Session()
    client = session.client(
        service_name='secretsmanager',
        region_name=region_name
    )

    try:
        get_secret_value_response = client.get_secret_value(
            SecretId=secret_name
        )
    except ClientError as e:
        # For a list of exceptions thrown, see
        # https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
        raise e

    secret = json.loads(get_secret_value_response['SecretString'])
    return secret

def lambda_handler(event, context):
    """Sample pure Lambda function

    Parameters
    ----------
    event: dict, required
        API Gateway Lambda Proxy Input Format

        Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format

    context: object, required
        Lambda Context runtime methods and attributes

        Context doc: https://docs.aws.amazon.com/lambda/latest/dg/python-context-object.html

    Returns
    ------
    API Gateway Lambda Proxy Output Format: dict

        Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
    """

    # try:
    #     ip = requests.get("http://checkip.amazonaws.com/")
    # except requests.RequestException as e:
    #     # Send some context about this error to Lambda Logs
    #     print(e)

    #     raise e

    secret = get_secret()


    # API keyを設定
    anthropic = Anthropic(api_key=secret["claude-api-key"])

    # メッセージを送信
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

    return {
        "statusCode": 200,
        "body": json.dumps({
            "message": message.content[0].text
        }, ensure_ascii=False),
    }
