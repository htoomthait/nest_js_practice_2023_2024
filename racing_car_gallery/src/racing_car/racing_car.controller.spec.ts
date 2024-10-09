import { Test, TestingModule } from '@nestjs/testing';
import { RacingCarController } from './racing_car.controller';

describe('RacingCarController', () => {
  let controller: RacingCarController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RacingCarController],
    }).compile();

    controller = module.get<RacingCarController>(RacingCarController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
