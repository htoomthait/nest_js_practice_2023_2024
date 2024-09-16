import { HttpStatus, Injectable } from '@nestjs/common';
import { GenericApiResponseDto } from 'src/dto/generic_api_response.dto';

@Injectable()
export class UtilityService {

    constructor(private fmtResp: GenericApiResponseDto) { }


    composeResponse(
        status: string,
        message: string,
        data: any,
        httpStatus: number
    ) {

        this.fmtResp = {
            status: status,
            message: message,
            data: data,
        }

        return {
            fmtResp: this.fmtResp,
            httpStatus: httpStatus
        };

    }

    respWithDefaultDatabaseError() {
        return this.composeResponse(
            "error",
            "Database query error",
            null,
            HttpStatus.INTERNAL_SERVER_ERROR
        )
    }
}
