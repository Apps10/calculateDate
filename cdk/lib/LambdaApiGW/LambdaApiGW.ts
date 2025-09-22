import * as cdk from 'aws-cdk-lib';
import * as apigw from 'aws-cdk-lib/aws-apigateway';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';

export class LambdaApiGW extends apigw.LambdaRestApi {
  constructor(scope: Construct, handler: lambda.Function, resource: string, method: string ){
    super(scope, "LambdaApiGW", {
      handler,
      proxy: false
    })
    
    const resourceInstance = this.root.addResource(resource)
    resourceInstance.addMethod(method)

    new cdk.CfnOutput(this, 'ApiUrl', {
      value: this.url ?? 'No URL generated',
    });
  }
}