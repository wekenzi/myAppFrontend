import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FreelancersmodalComponent } from './freelancersmodal.component';

describe('FreelancersmodalComponent', () => {
  let component: FreelancersmodalComponent;
  let fixture: ComponentFixture<FreelancersmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FreelancersmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FreelancersmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
