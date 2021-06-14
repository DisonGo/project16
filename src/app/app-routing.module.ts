import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';

const routes: Routes = [
  {
    path:"",
    component:MainComponent
  },
  {
    path:"stickers",
    loadChildren: ()=>import('./stickers/stickers.module').then(mod=>mod.StickersModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
