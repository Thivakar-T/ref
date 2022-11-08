import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteEngineerComponent } from './site-engineer.component';

describe('SiteEngineerComponent', () => {
  let component: SiteEngineerComponent;
  let fixture: ComponentFixture<SiteEngineerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SiteEngineerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SiteEngineerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
