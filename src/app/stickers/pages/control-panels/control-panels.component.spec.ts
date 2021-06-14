import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlPanelsComponent } from './control-panels.component';

describe('ControlPanelsComponent', () => {
  let component: ControlPanelsComponent;
  let fixture: ComponentFixture<ControlPanelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControlPanelsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlPanelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
