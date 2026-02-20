import { TestBed } from '@angular/core/testing';

import { BoxState } from './box-state';

describe('BoxState', () => {
  let service: BoxState;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoxState);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
