import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import path from 'path';
import { compileFunction } from 'vm';
import { CalculateDateLambda } from './lambdas/calculateDateLambda';


export class LambdaStack extends cdk.Stack {
  constructor(scope: Construct, props?: cdk.StackProps) {
    super(scope, 'Calculate-Date-lambda-stack', props);

    new CalculateDateLambda(this)
  }
}
