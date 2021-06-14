import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StickerTypeControlPanelComponent } from './sticker-type-control-panel.component';

describe('StickerTypeControlPanelComponent', () => {
  let component: StickerTypeControlPanelComponent;
  let fixture: ComponentFixture<StickerTypeControlPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StickerTypeControlPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StickerTypeControlPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
