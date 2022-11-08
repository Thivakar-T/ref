import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorListWisePurchaseComponent } from './vendor-list-wise-purchase.component';

describe('VendorListWisePurchaseComponent', () => {
  let component: VendorListWisePurchaseComponent;
  let fixture: ComponentFixture<VendorListWisePurchaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorListWisePurchaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendorListWisePurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
