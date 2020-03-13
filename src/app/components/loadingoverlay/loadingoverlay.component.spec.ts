import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingoverlayComponent } from './loadingoverlay.component';

describe('LoadingoverlayComponent', () => {
  let component: LoadingoverlayComponent;
  let fixture: ComponentFixture<LoadingoverlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadingoverlayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingoverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
