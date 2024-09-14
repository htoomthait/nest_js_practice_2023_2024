import { Injectable, Logger } from "@nestjs/common";
import { writeFile, writeFileSync } from "fs";
import { readFile } from "fs/promises";
import { join } from 'path';


@Injectable()
export class JsonDummyDataService {
    private readonly logger = new Logger(JsonDummyDataService.name);


    async getDataFromJson() {
        // Get file path
        const filePath = join(__dirname, "..", "..", "/dummy_data/racing_cars.json");
        // this.logger.debug(filePath);



        // Read  the file
        const data = await readFile(filePath, 'utf-8');


        // Parse the JSON data
        const parseData = JSON.parse(data);

        return parseData;


    }

    setDataToJson(newData) {
        const filePath = join(__dirname, "..", "..", "/dummy_data/racing_cars.json");
        writeFileSync(filePath, JSON.stringify(newData), 'utf-8');

    }


    getDataFromJsArray() {
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
            {
                "id": 6,
                "model_name": "cvg145",
                "brand": "chevrolet",
                "car_type": "sport racing",
                "engine_power": "730 hp"
            }
        ];
    }
}