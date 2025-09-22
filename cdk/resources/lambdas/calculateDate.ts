import { APIGatewayEvent, Context } from 'aws-lambda';

export async function main(event: APIGatewayEvent, context: Context) {
  console.log('Request:', event);
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'AWS CDK + Layer',
      input: event,
    }),
  };
}