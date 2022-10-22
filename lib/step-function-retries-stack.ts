import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as sf from 'aws-cdk-lib/aws-stepfunctions';
import * as tasks from 'aws-cdk-lib/aws-stepfunctions-tasks';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { Duration } from 'aws-cdk-lib';


export interface StepFunctionRetriesStackProps extends cdk.StackProps {
  function: lambda.IFunction;
}

export class StepFunctionRetriesStack extends cdk.Stack {

  constructor(scope: Construct, id: string, props: StepFunctionRetriesStackProps) {
    super(scope, id, props);

    const func = props?.function;  
    const retryProps = {
      interval: Duration.seconds(1), //default = 1
      maxAttempts: 3,
      backoffRate: 2, //default = 2
      errors: ["Error1", "Error2"]
    }  
    const retryProps2 = {
      interval: Duration.seconds(1), //default = 1
      maxAttempts: 3,
      backoffRate: 2, //default = 2
      errors: ["Error3", "Error4"]
    }  

    const successState = new sf.Succeed(this, "EndState");

    const catchAllState = new sf.Pass(this,"CatchAllState").next(successState);

    new sf.StateMachine(this, 'Retry', {
      definition: new tasks.LambdaInvoke(this, "trycatchfunction", {
        lambdaFunction: func,
      }).addRetry(retryProps).addRetry(retryProps2).addCatch(catchAllState).next(successState)
    });
  }
}
