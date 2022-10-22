import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as njs from 'aws-cdk-lib/aws-lambda-nodejs';

export class LambdaStack extends cdk.Stack {
  public readonly handler: lambda.IFunction
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    this.handler = new njs.NodejsFunction(this, "TestFunction", {
        runtime: lambda.Runtime.NODEJS_16_X, 
        entry: 'src/function.ts',
        handler: "lambdaHandler",
      });
  }
}