import { Construct } from "constructs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import path from "path";

export class CodeLayer extends lambda.LayerVersion {
  constructor(scope: Construct) {
    super(scope, "LambdaLayerSrc", {
      code: lambda.Code.fromAsset(path.join(__dirname, "../../../src")),
      compatibleRuntimes: [lambda.Runtime.NODEJS_22_X],
      description: "layer del codigo",
    });
  }
}
