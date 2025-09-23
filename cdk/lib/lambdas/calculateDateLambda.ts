import * as cdk from "aws-cdk-lib";
import * as ssm from 'aws-cdk-lib/aws-ssm';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { Construct } from "constructs";
import { LambdaBasicRol } from "../iam/lambdaBasicRol";
import path from "path";
import { CodeLayer, DependenciesCodeLayer } from "../layers";
import { LambdaApiGW } from "../LambdaApiGW/LambdaApiGW";

export class CalculateDateLambda {
  constructor(scope: Construct) {
    const basicRole = new LambdaBasicRol(scope)
    
    const codeLayerArn = ssm.StringParameter.valueForStringParameter(
      scope,
      '/test-holiday/layers/code/arn'
    );
    const depsLayerArn = ssm.StringParameter.valueForStringParameter(
      scope,
      '/test-holiday/layers/utils/arn'
    );

    const codeLayer = lambda.LayerVersion.fromLayerVersionArn(scope, 'LambdaLayerSrc', codeLayerArn);
    const depsLayer = lambda.LayerVersion.fromLayerVersionArn(scope, 'UtilsLayer', depsLayerArn); 
     

    const lambdaInstance = new lambda.Function(scope, 'CalculateDateLambda', {
      runtime: lambda.Runtime.NODEJS_22_X,
      handler: 'calculateDate.main', 
      code: lambda.Code.fromAsset( path.join(__dirname, '../../dist/resources/lambdas')),    
      layers: [codeLayer, depsLayer],
      functionName: "CalculateDateLambda",
      role: basicRole
    });

    new LambdaApiGW(scope, lambdaInstance, 'calculate', 'GET')

  }
}
