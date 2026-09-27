import { TestBed } from '@angular/core/testing';
import { MessageboardService } from './messageboard-service';

describe('MessageboardService', () => {
  let service: MessageboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessageboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
