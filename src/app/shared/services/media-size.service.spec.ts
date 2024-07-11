import { TestBed } from '@angular/core/testing';

import { MediaSizeService } from './media-size.service';

describe('MediaSizeService', () => {
  let service: MediaSizeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MediaSizeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
