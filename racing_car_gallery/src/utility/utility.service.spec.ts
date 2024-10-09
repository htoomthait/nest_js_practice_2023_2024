import { Test, TestingModule } from '@nestjs/testing';
import { RespUtilityService } from './resp-utility.service';

describe('UtilityService', () => {
  let service: RespUtilityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RespUtilityService],
    }).compile();

    service = module.get<RespUtilityService>(RespUtilityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
