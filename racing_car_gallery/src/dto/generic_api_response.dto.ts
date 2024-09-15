import { Injectable } from "@nestjs/common";

@Injectable()
export class GenericApiResponseDto {
    status: string;
    message: string;
    data: any;
}