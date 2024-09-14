import { Injectable, Logger } from '@nestjs/common';
import { JsonDummyDataService } from './json_dummy_data.service';

@Injectable()
export class RacingCarService {
    private readonly logger = new Logger(RacingCarService.name);

    constructor(private readonly jsnDataService: JsonDummyDataService) { }

    async getCarList() {

        const dummyData = this.jsnDataService.getDataFromJson();
        return dummyData;


    }
    async getCarById(id: number) {
        const dummyData = await this.jsnDataService.getDataFromJson();
        // this.logger.debug(dummyData);

        const searchedData = dummyData.find(car => car.id == id)
        // this.logger.debug(searchedData);

        return searchedData;
    }

    async addNewRecord(newRecord: any) {
        const dummyData = await this.jsnDataService.getDataFromJson();

        dummyData.push(newRecord);

        this.jsnDataService.setDataToJson(dummyData);

        return true;


    }

    async deleteRecordById(id: number) {
        const dummyData = await this.jsnDataService.getDataFromJson();

        const fitlerRecords = dummyData.filter(car => car.id != id);

        this.jsnDataService.setDataToJson(fitlerRecords);

        return true;

    }

    async updatedRecordById(updatedRecord: any, id: number) {
        const dummyData = await this.jsnDataService.getDataFromJson();

        const updatedDummyData = dummyData.map(car => {
            if (car.id == id) {
                return car = updatedRecord;
            }
            return car;
        });

        this.jsnDataService.setDataToJson(updatedDummyData);

        return true;

    }
}