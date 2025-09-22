#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { ACCOUNT, REGION } from '../../shared/config/env'
import { LambdaStack } from '../lib/LambdaStack';

const app = new cdk.App();
new LambdaStack(app, {
  env: { account: ACCOUNT, region: REGION }
});