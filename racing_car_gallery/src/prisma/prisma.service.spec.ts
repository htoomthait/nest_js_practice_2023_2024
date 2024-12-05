import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from './prisma.service';
import { QueueService } from '../queue/queue.service';
import { getQueueToken } from '@nestjs/bull';

describe('PrismaService', () => {
  let service: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService, QueueService,
        {
          provide: getQueueToken("example-queue"),
          useValue: {
            add: jest.fn(),
            process: jest.fn()
          }
        }
      ],
    }).compile();

    service = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
