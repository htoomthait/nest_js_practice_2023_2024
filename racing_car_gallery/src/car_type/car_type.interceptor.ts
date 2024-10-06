import { BadRequestException, CallHandler, ExecutionContext, HttpStatus, Injectable, NestInterceptor } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { catchError, Observable } from 'rxjs';
import { CarTypeDto } from './car_type.dto';
import { validate } from 'class-validator';

@Injectable()
export class CarTypeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const body = request.body;

    // Here, you would pass your DTO, for example, CreateUserDto
    const dtoInstance = plainToInstance(CarTypeDto, body);

    validate(dtoInstance).then((errors) => {

      if (errors.length > 0) {
        const errorMessages = errors.map(err => {
          const constraints = err.constraints;
          const constrtMessages = [];
          Object.keys(constraints).forEach((key) => {
            constrtMessages.push(constraints[key]);
          })

          return {
            field: err.property,
            error_message: constrtMessages
          }
        });
        console.log(errorMessages);
        const response = context.switchToHttp().getResponse();

        response.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
          status: "invalid",
          message: errorMessages,
        });



      }


    }).catch(err => {
      throw new BadRequestException({ message: 'Validation error', error: err.message })
    });

    return next.handle();


  }
}
