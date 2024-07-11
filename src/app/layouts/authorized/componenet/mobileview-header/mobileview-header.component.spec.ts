import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileviewHeaderComponent } from './mobileview-header.component';

describe('MobileviewHeaderComponent', () => {
  let component: MobileviewHeaderComponent;
  let fixture: ComponentFixture<MobileviewHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobileviewHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MobileviewHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
