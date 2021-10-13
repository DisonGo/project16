import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpStickerService } from 'src/app/shared/services/http-sticker.service';
import { Sticker } from '../../../shared/interface/sticker.interface';
import { StickerType } from '../../../shared/interface/type.interface';

@Component({
  selector: 'app-sticker',
  templateUrl: './sticker.component.html',
  styleUrls: ['./sticker.component.css']
})
export class StickerComponent implements OnInit {

  constructor(private fb: FormBuilder ,private httpServ: HttpStickerService,private router:Router) {}
  stickerForm!:FormGroup
  oldTitle!: string;
  oldText!: string;
  oldDate!: any;
  initId!:any
  // editing = false
  displayType = false
  @Input() data!:Sticker;
  @Input() editing!:boolean;
  stickerTypes!:StickerType[];
  @Output() stickerStartEdit = new EventEmitter ();
  @Output() stickerDelete = new EventEmitter <number>();
  turnOnEditing(){
    this.stickerForm.get('title')?.setValue(this.data.title)
    this.stickerForm.get('text')?.setValue(this.data.text)
    this.stickerForm.get('type')?.setValue(this.initId)
    this.oldTitle = this.data.title 
    this.oldText = this.data.text 
    this.oldDate = this.data.date 
  }
  async turnOffEditing(ending:boolean){
    if(ending){
      let values = this.stickerForm.value
      this.data.title = values.title
      this.data.text = values.text
      this.data.typeId = parseInt(values.type)
      this.data.lastEdited = Date.now()
      await this.editSticker(this.data)
      this.router.navigate(['stickers'])
    }else{
      this.turnOnEditing()
    }
  }
  deleteSticker(){
    this.stickerDelete.emit(this.data.id)
  }
  async editSticker(sticker:Sticker){
    try{
      await this.httpServ.editSticker(sticker)    
    }catch(err){
      console.log(err);
    }finally{
      this.router.navigate(['stickers'])
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
  startEdit(){
    this.stickerStartEdit.emit()
  }
  ngOnInit(): void {
    const controls = {
      title: ["",[Validators.required,Validators.maxLength(30)]],
      text: ["",[Validators.required,Validators.maxLength(100)]],
      type: [0,[Validators.maxLength(15)]]
    }
    this.stickerForm = this.fb.group(controls)
    this.getTypes()
    this.initId = this.data.type.id
    if(this.editing){
      this.turnOnEditing()
    }
  }

}
