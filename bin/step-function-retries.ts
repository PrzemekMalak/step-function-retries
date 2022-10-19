#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { StepFunctionRetriesStack } from '../lib/step-function-retries-stack';
import { LambdaStack } from '../lib/lambda-stack';

const app = new cdk.App();

const lambda = new LambdaStack(app, 'LambdaStack', {
  env: { region: 'eu-central-1' },
});

new StepFunctionRetriesStack(app, 'StepFunctionRetriesStack', {
  env: { region: 'eu-central-1' },
  function: lambda.handler
});

