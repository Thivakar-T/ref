import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractorworkerlistComponent } from './contractorworkerlist.component';

describe('ContractorworkerlistComponent', () => {
  let component: ContractorworkerlistComponent;
  let fixture: ComponentFixture<ContractorworkerlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContractorworkerlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContractorworkerlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
