import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteCreationListComponent } from './site-creation-list.component';

describe('SiteCreationListComponent', () => {
  let component: SiteCreationListComponent;
  let fixture: ComponentFixture<SiteCreationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SiteCreationListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SiteCreationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
