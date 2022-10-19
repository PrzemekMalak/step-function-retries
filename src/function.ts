import { Context, APIGatewayProxyResult, APIGatewayEvent } from 'aws-lambda';

var counter = 0

export const lambdaHandler = async (event: any, context: Context): Promise<unknown> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);
    console.log(`Context: ${JSON.stringify(context, null, 2)}`);
    counter++;
    if (counter % 5 == 0) {
        counter = 0
        return 'WOW!!!! It works.'
    }
    else if (counter % 4 == 0) {
        throw new Error('ERROR 4');
    }
    else if (counter % 3 == 0) {
        throw new Error('ERROR 3');
    }
    else if (counter % 2 == 2){
        throw new Error('ERROR 2');
    }
    else {
        throw new Error('ERROR 1');
    }
};