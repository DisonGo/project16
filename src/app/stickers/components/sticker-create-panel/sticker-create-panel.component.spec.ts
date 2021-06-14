import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StickerCreatePanelComponent } from './sticker-create-panel.component';

describe('StickerCreatePanelComponent', () => {
  let component: StickerCreatePanelComponent;
  let fixture: ComponentFixture<StickerCreatePanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StickerCreatePanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StickerCreatePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
