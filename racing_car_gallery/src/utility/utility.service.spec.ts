import { Test, TestingModule } from '@nestjs/testing';
import { RespUtilityService } from './resp-utility.service';
import { GenericApiResponseDto } from '../dto/generic_api_response.dto';

describe('UtilityService', () => {
  let service: RespUtilityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GenericApiResponseDto, {
        provide: RespUtilityService,
        useValue: {
          handleResponse: jest.fn(), // Mock method for RespUtilityService
        },
      }],
    }).compile();

    service = module.get<RespUtilityService>(RespUtilityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
