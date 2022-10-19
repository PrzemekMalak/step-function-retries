import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as sf from 'aws-cdk-lib/aws-stepfunctions';
import * as tasks from 'aws-cdk-lib/aws-stepfunctions-tasks';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { Lambda } from 'aws-sdk';
import { IFunction } from 'aws-cdk-lib/aws-lambda';


export interface StepFunctionRetriesStackProps extends cdk.StackProps {
  function: lambda.IFunction;
}

export class StepFunctionRetriesStack extends cdk.Stack {
  private func: lambda.IFunction
  constructor(scope: Construct, id: string, props: StepFunctionRetriesStackProps) {
    super(scope, id, props);

    const func = props?.function;    
    new sf.StateMachine(this, 'Retry', {
      definition: new tasks.LambdaInvoke(this, "trycatchfunction", {
        lambdaFunction: func,
      }).next(new sf.Succeed(this, "End"))
    });

  }
}
