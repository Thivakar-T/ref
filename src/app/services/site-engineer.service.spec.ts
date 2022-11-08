import { TestBed } from '@angular/core/testing';

import { SiteEngineerService } from './site-engineer.service';

describe('SiteEngineerService', () => {
  let service: SiteEngineerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SiteEngineerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
