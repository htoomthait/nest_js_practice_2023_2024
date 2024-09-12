import { Controller, Get } from '@nestjs/common';

@Controller('racing-car')
export class RacingCarController {



    @Get('list')
    getRacingCarList() {
        const carList = [
            {
                "id": 3,
                "model_name": "abc134",
                "brand": "porsche",
                "car_type": "sport racing",
                "engine_power": "720 hp"
            },
            {
                "id": 4,
                "model_name": "afg134",
                "brand": "toyota",
                "car_type": "sport racing",
                "engine_power": "640 hp"
            },
            {
                "id": 5,
                "model_name": "afg145",
                "brand": "alfa romeo",
                "car_type": "sport racing",
                "engine_power": "730 hp"
            },
        ];


        return {
            "status": "success",
            "message": "successfuly queried car list",
            "data": carList
        };
    }


}
