import * as ssm from 'aws-cdk-lib/aws-ssm';
import { Construct } from "constructs";
import * as lambda from 'aws-cdk-lib/aws-lambda';
import path from "path";


export class DependenciesCodeLayer extends lambda.LayerVersion {
  constructor(scope: Construct) {
    super(scope, 'UtilsLayer', {
      code: lambda.Code.fromAsset(path.join(__dirname, "../../resources/layers/dependencies")),
      compatibleRuntimes: [lambda.Runtime.NODEJS_22_X],
      layerVersionName: "UtilsLayer",
      description: "layer de dependencias"
    })

    new ssm.StringParameter(this, 'UtilsLayerArnParam', {
      parameterName: '/test-holiday/layers/utils/arn',
      stringValue: this.layerVersionArn,
    });
  }
}
