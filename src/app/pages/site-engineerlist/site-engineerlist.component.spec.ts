import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteEngineerlistComponent } from './site-engineerlist.component';

describe('SiteEngineerlistComponent', () => {
  let component: SiteEngineerlistComponent;
  let fixture: ComponentFixture<SiteEngineerlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SiteEngineerlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SiteEngineerlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
