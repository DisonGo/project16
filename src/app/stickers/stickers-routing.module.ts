import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ControlPanelsComponent } from './pages/control-panels/control-panels.component';
import { StickersComponent } from './pages/control-panels/stickers/stickers.component';
import { TypesComponent } from './pages/control-panels/types/types.component';
import { ItemComponent } from './pages/item/item.component';
import { StickerListComponent } from './pages/sticker-list/sticker-list.component';
import { StickersLayoutComponent } from './shared/components/stickers-layout/stickers-layout.component';

const routes: Routes = [
  {
    path: '',
    component: StickersLayoutComponent,
    children:[
      {
        path: '',
        component: StickerListComponent 
      },
      {
        path: 'item/:id',
        component: ItemComponent
      },
      {
        path: 'item',
        component: ItemComponent
      },
      {
        path: 'control-panels',
        component: ControlPanelsComponent,
        children:[
          {
            path: 'stickers',
            component: StickersComponent
          },
          {
            path: 'types',
            component: TypesComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StickersRoutingModule { }
