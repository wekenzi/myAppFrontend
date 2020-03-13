import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppellationsComponent } from './appellations.component';

describe('AppellationsComponent', () => {
  let component: AppellationsComponent;
  let fixture: ComponentFixture<AppellationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppellationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppellationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
