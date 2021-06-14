import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StickersLayoutComponent } from './stickers-layout.component';

describe('StickersLayoutComponent', () => {
  let component: StickersLayoutComponent;
  let fixture: ComponentFixture<StickersLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StickersLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StickersLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
