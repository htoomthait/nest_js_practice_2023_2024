import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GenericApiResponseDto } from './dto/generic_api_response.dto';
import { QueueService } from './queue/queue.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        {
          provide: QueueService,
          useValue: {}, // Mock the QueueService
        },
        {
          provide: GenericApiResponseDto,
          useValue: {}, // Mock the GenericApiResponseDto if required
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  it('should return "Hello World!"', () => {
    expect(appController.getHello()).toBe('Hello World!');
  });
});