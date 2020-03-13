import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppellationsmodalComponent } from './appellationsmodal.component';

describe('AppellationsmodalComponent', () => {
  let component: AppellationsmodalComponent;
  let fixture: ComponentFixture<AppellationsmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppellationsmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppellationsmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
