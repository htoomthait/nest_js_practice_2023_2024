import { Test, TestingModule } from '@nestjs/testing';
import { RacingCarService } from './racing_car.service';

describe('RacingCarService', () => {
  let service: RacingCarService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RacingCarService],
    }).compile();

    service = module.get<RacingCarService>(RacingCarService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
