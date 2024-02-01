import { TestBed } from '@angular/core/testing';
import { ActivateGuardService } from './activategaurd.service';


describe('ActivategaurdService', () => {
  let service: ActivateGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActivateGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
