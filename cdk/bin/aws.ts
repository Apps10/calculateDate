#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { LambdaStack } from "../lib/LambdaStack";
import { LayerStack } from "../lib/LayersStack";
import { ACCOUNT, REGION } from "../lib/config/env";

const app = new cdk.App();

new LayerStack(app, "Layer-stack", {
  env: { account: ACCOUNT, region: REGION },
});

new LambdaStack(app, "Lambda-stack", {
  env: { account: ACCOUNT, region: REGION },
});

