import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { CfnOutput } from 'aws-cdk-lib';

export class LambdaStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const handler = new lambda.Function(this, "TestFunction", {
        runtime: lambda.Runtime.NODEJS_14_X, 
        code: lambda.Code.fromAsset("src"),
        handler: "function.lambdaHandler"
      });

      new CfnOutput(this, "lambdaArn", {
        value: handler.functionArn,
        exportName: "functionArn"
      })
  }
}