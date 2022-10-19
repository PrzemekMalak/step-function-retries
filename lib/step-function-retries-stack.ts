import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as sf from 'aws-cdk-lib/aws-stepfunctions';
import * as tasks from 'aws-cdk-lib/aws-stepfunctions-tasks';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { FunctionARN } from 'aws-sdk/clients/cloudfront';


export interface StepFunctionRetriesStackProps extends cdk.StackProps {
  func: FunctionARN
}

export class StepFunctionRetriesStack extends cdk.Stack {
  private func: FunctionARN
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);


    const stateMachine = new sf.StateMachine(this, 'CheckLogs', {
      definition: new tasks.LambdaInvoke(this, "DateTimeToEpochLambdaTask", {
        lambdaFunction: this.func
        payload: sf.TaskInput.fromObject({
          "DateTime": sf.TaskInput.fromJsonPathAt('$$.State.EnteredTime')})
      }).next(new sf.Succeed(this, "End"))
    });

  }
}
