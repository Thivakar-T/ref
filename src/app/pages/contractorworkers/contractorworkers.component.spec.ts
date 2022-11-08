import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractorworkersComponent } from './contractorworkers.component';

describe('ContractorWorkersComponent', () => {
  let component: ContractorworkersComponent;
  let fixture: ComponentFixture<ContractorworkersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContractorworkersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContractorworkersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
