import { IsNotEmpty, IsString } from "class-validator";

export class CarTypeDto {
    @IsString()
    @IsNotEmpty({ message: 'Name should not be empty' })
    name: string;


}