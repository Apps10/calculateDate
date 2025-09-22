import { Construct } from "constructs";
import * as iam from "aws-cdk-lib/aws-iam";

export class LambdaBasicRol extends iam.Role {
  constructor(scope: Construct) {
    super(scope, "LambdaBasicRole", {
      assumedBy: new iam.ServicePrincipal("lambda.amazonaws.com"),
    })
    
    //permiso basico de ejecucion
    this.addManagedPolicy(
      iam.ManagedPolicy.fromAwsManagedPolicyName(
        "service-role/AWSLambdaBasicExecutionRole"
      )
    );
  }
}
