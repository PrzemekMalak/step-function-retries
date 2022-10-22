import { Context} from 'aws-lambda';
import { CustomError } from 'ts-custom-error'

class Error1 extends CustomError{
    public constructor(
		message?: string,
	) {
		super(message)
	}
}

class Error2 extends CustomError{
    public constructor(
		message?: string,
	) {
		super(message)
	}
}

class Error3 extends CustomError{
    public constructor(
		message?: string,
	) {
		super(message)
	}
}

class Error4 extends CustomError{
    public constructor(
		message?: string,
	) {
		super(message)
	}
}

var counter = 0

export const lambdaHandler = async (event: any, context: Context): Promise<unknown> => {
    counter++;
    if (counter % 5 == 0) {
        counter = 0
        return 'WOW!!!! It works.'
    }
    else if (counter % 4 == 0) {
        throw new Error4('Error 4 message')
    }
    else if (counter % 3 == 0) {
        throw new Error3('Error 3 message')
        //throw new Error("Error message");
    }
    else if (counter % 2 == 0){
        throw new Error2('Error 2 message')
    }
    else {
        throw new Error1("Error 1 message");
    }
};