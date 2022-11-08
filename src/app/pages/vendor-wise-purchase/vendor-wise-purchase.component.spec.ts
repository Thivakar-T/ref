import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorWisePurchaseComponent } from './vendor-wise-purchase.component';

describe('VendorWisePurchaseComponent', () => {
  let component: VendorWisePurchaseComponent;
  let fixture: ComponentFixture<VendorWisePurchaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorWisePurchaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendorWisePurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
