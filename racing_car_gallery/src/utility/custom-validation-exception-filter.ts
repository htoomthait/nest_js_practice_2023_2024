import { ArgumentMetadata, ArgumentsHost, BadRequestException, Catch, ExceptionFilter } from "@nestjs/common";
import { ExceptionsHandler } from "@nestjs/core/exceptions/exceptions-handler";
import { ValidationError } from "class-validator";

export class CustomValidationExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const response = host.switchToHttp().getResponse();
        const status = exception.getStatus();
        const exceptionResponse: any = exception.getResponse();

        // console.log(exceptionResponse.message);

        // Format the response to be key-value pairs
        /* const formattedErrors = {};
        if (Array.isArray(exceptionResponse.message)) {
            exceptionResponse.message.forEach((error: ValidationError) => {
                const field = error.property;
                const constraints = error.constraints;
                formattedErrors[field] = Object.values(constraints).join(', ');
            });
        } */

        response.status(status).json({
            status: 'invalid',
            statusCode: status,
            error: 'Bad Request',
            message: exceptionResponse.message || 'Validation Failed',

        });
    }


}