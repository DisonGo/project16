import { TestBed } from '@angular/core/testing';

import { HttpStickerService } from './http-sticker.service';

describe('HttpStickerService', () => {
  let service: HttpStickerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpStickerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
