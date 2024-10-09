import { HttpStatus, Injectable, Scope } from '@nestjs/common';
import { GenericApiResponseDto } from 'src/dto/generic_api_response.dto';

class ResponseForController {
    fmtResp: GenericApiResponseDto;
    httpStatus: number;
}

@Injectable({ scope: Scope.REQUEST })
export class RespUtilityService {

    private status: string = "";
    private respMessage: string = "";
    private data: any = null;
    private respHttpStatus: number = HttpStatus.OK;

    constructor(private fmtResp: GenericApiResponseDto) {

    }


    clearData(): void {
        this.status = "";
        this.respMessage = "";
        this.respHttpStatus = HttpStatus.OK;
        this.data = null;
    }


    setStatus(status: string) {
        this.status = status;
        return this;
    }

    setMessage(message: string) {
        this.respMessage = message;
        return this;
    }

    setData(data: any) {
        this.data = data;
        return this;
    }

    setHttpStatus(httpStatus) {
        this.respHttpStatus = httpStatus;
        return this;
    }



    composeResponse(): ResponseForController {

        this.fmtResp = {
            status: this.status,
            message: this.respMessage,
            data: this.data,
        }

        return {
            fmtResp: this.fmtResp,
            httpStatus: this.respHttpStatus
        };

    }

    respDefaultNotFound(): ResponseForController {

        this.setStatus("not found")
            .setHttpStatus(HttpStatus.NOT_FOUND);

        return this.composeResponse();
    }

    respWithDefaultDatabaseError(): ResponseForController {
        this.setStatus("error")
            .setMessage("Database query error")
            .setHttpStatus(HttpStatus.INTERNAL_SERVER_ERROR);

        return this.composeResponse();
    }
}
