import { Test } from '@nestjs/testing';
import { NotificationsService } from './notifications.service';

describe('NotificationsService', () => {
  let service: NotificationsService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [NotificationsService],
    }).compile();

    service = module.get(NotificationsService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
