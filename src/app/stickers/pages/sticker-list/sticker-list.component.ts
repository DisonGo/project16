import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Sticker } from 'src/app/shared/interface/sticker.interface';
import { StickerType } from 'src/app/shared/interface/type.interface';
import { HttpStickerService } from 'src/app/shared/services/http-sticker.service';


@Component({
  selector: 'app-sticker-list',
  templateUrl: './sticker-list.component.html',
  styleUrls: ['./sticker-list.component.css']
})
export class StickerListComponent implements OnInit {

  stickers: Sticker[] = []
  stickerTypes: StickerType[] = []
  constructor(private httpServ:HttpStickerService,private router:Router){}
  async getStickers(){
    try{
      this.stickers = await this.httpServ.getStickers()
    }catch(err){
      console.log(err);
      
    }finally{
    }
  }
  async deleteSticker(id:number){
    try{
      await this.httpServ.deleteSticker(id)
    }catch(err){
      console.log(err);
      
    }finally{
      this.getStickers()
    }
  }
  async getTypes(){
    try{
      this.stickerTypes = await this.httpServ.getStickerTypes()
      console.log(this.stickerTypes);
      
    }catch(err){
      console.log(err);
    }
    
  }
  loadItem(id?:number){
    if(id){
      this.router.navigate([this.router.url,'item',id])
    }else{
      this.router.navigate([this.router.url,'control-panels','stickers'])
    }
  }
  ngOnInit(): void {
    this.getStickers()
    this.getTypes()
  }

}
