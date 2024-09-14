import { Injectable } from '@nestjs/common';

@Injectable()
export class RacingCarService {

    getCarList() {
        return [
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
    }
}