import * as ssm from 'aws-cdk-lib/aws-ssm';
import { Construct } from "constructs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import path from "path";

export class CodeLayer extends lambda.LayerVersion {
  constructor(scope: Construct) {
    super(scope, "LambdaLayerSrc", {
      code: lambda.Code.fromAsset(path.join(__dirname, "../../resources/layers/code")),
      compatibleRuntimes: [lambda.Runtime.NODEJS_22_X],
      layerVersionName: "LambdaLayerSrc",
      description: "layer del codigo",
    });

    new ssm.StringParameter(this, 'CodeLayerArnParam', {
      parameterName: '/test-holiday/layers/code/arn',
      stringValue: this.layerVersionArn,
    });
  }
}
