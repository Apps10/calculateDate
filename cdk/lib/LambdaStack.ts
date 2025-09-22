import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import path from 'path';
import { CalculateDateLambda } from './lambdas/calculateDateLambda';


export class LambdaStack extends cdk.Stack {
  constructor(scope: Construct, props?: cdk.StackProps) {
    super(scope, 'Calculate-Date-lambda-stack', props);

    new CalculateDateLambda(this)
  }
}
