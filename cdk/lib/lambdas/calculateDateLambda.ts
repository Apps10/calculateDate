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
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'handler.main', // archivo handler.ts -> export const main = ...
      code: lambda.Code.fromAsset(path.join(__dirname, '../lambda')),
      layers: [codeLayer, depsLayer],
      role: basicRole
    });

    new LambdaApiGW(scope, lambdaInstance, '/', 'GET')

  }
}
