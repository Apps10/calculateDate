import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CodeLayer, DependenciesCodeLayer } from './layers';


export class LayerStack extends cdk.Stack {
  constructor(scope: Construct, id:string, props?: cdk.StackProps) {
    super(scope, id, props);

    new CodeLayer(this)
    new DependenciesCodeLayer(this)
  }
}
