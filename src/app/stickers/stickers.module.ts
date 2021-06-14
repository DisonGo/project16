import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StickersRoutingModule } from './stickers-routing.module';
import { StickerComponent } from './components/sticker/sticker.component';
import { StickerCreatePanelComponent } from './components/sticker-create-panel/sticker-create-panel.component';
import { StickerTypeControlPanelComponent } from './components/sticker-type-control-panel/sticker-type-control-panel.component';
import { StickersLayoutComponent } from './shared/components/stickers-layout/stickers-layout.component';
import { ItemComponent } from './pages/item/item.component';
import { StickerListComponent } from './pages/sticker-list/sticker-list.component';
import { StickersComponent } from './pages/control-panels/stickers/stickers.component';
import { TypesComponent } from './pages/control-panels/types/types.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ControlPanelsComponent } from './pages/control-panels/control-panels.component';


@NgModule({
  declarations: [
    StickerComponent,
    StickerCreatePanelComponent,
    StickerTypeControlPanelComponent,
    StickersLayoutComponent,
    ItemComponent,
    StickerListComponent,
    StickersComponent,
    TypesComponent,
    ControlPanelsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StickersRoutingModule
  ]
})
export class StickersModule { }
