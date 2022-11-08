import { ComponentFixture, TestBed } from '@angular/core/testing';

import {SiteCreationComponent } from './sitecreation.component';

describe('SitecreationComponent', () => {
  let component: SiteCreationComponent;
  let fixture: ComponentFixture<SiteCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SiteCreationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SiteCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
