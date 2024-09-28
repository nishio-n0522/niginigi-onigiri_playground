import json

import boto3
from aws_lambda_powertools import Logger
from aws_lambda_powertools.utilities import parameters

# CONSTANT
DYNAMODB_EXPERIMENTTABLE_NAME = "/niginigi-onigiri_playground/dynamodb_dev/experimental_data"

logger = Logger()


def lambda_handler(event, context):

    logger.info("execute async processing lambda!!!")

    table_name = parameters.get_parameter(DYNAMODB_EXPERIMENTTABLE_NAME)

    client = boto3.client('dynamodb')

    # update
    response = client.update_item(
        TableName=table_name,
        Key={"owner": {"S": "d794ba08-90c1-70e8-f52a-224d200086c7"}, "experimentName": {"S": "test"}},
        ExpressionAttributeNames={
            "#s": "status"
        },
        ExpressionAttributeValues={
            ":newStatus": {"S": "Processing"}
        },
        UpdateExpression="SET #s = :newStatus"
    )


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
            "message": "Good processing for you."
        }, ensure_ascii=False),
    }
