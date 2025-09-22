import { Construct } from "constructs";
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { LambdaBasicRol } from "../iam/lambdaBasicRol";
import path from "path";
import { CodeLayer, DependenciesCodeLayer } from "../layers";
import { LambdaApiGW } from "../LambdaApiGW/LambdaApiGW";

export class CalculateDateLambda {
  constructor(scope: Construct) {
    const basicRole = new LambdaBasicRol(scope)
    
    const codeLayer = new CodeLayer(scope);
    const depsLayer = new DependenciesCodeLayer(scope); 


    const lambdaInstance = new lambda.Function(scope, 'CalculateDateLambda', {
      runtime: lambda.Runtime.NODEJS_22_X,
      handler: 'calculateDate.main', 
      code: lambda.Code.fromAsset( path.join(__dirname, '../../dist/cdk/resources/lambdas')),    
      layers: [codeLayer, depsLayer],
      role: basicRole
    });

    new LambdaApiGW(scope, lambdaInstance, 'calculate', 'GET')

  }
}
