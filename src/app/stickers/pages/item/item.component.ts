import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Sticker } from 'src/app/shared/interface/sticker.interface';
import { HttpStickerService } from 'src/app/shared/services/http-sticker.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  id: number | null = null
  editing = false
  sticker:Sticker= {
    title:'',
    text:'',
    typeId:0,
    date:0,
    type:'',
    lastEdited:0,
    id:0
  }
  constructor(private httpServ:HttpStickerService,
              private router:Router,
              private activatedRoute:ActivatedRoute
              ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params)=>{
      this.id = params.id ?  +params.id:null
    })
    this.getData()
  }
  async getData(){
    if(this.id){
      try{
        this.sticker = await this.httpServ.getSticker(this.id)
        this.editing = true
      }catch(err){
        console.log(err);
        
      }
    }
  }

}
