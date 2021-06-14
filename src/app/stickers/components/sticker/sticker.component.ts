import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Sticker } from '../../../shared/interface/sticker.interface';
import { StickerType } from '../../../shared/interface/type.interface';

@Component({
  selector: 'app-sticker',
  templateUrl: './sticker.component.html',
  styleUrls: ['./sticker.component.css']
})
export class StickerComponent implements OnInit {

  constructor(private fb: FormBuilder) {}
  stickerForm!:FormGroup
  oldTitle!: string;
  oldText!: string;
  oldDate!: any;
  initId!:any
  editing = false
  displayType = false
  @Input() data!:Sticker;
  @Input() stickerTypes!:StickerType[];
  // @Output() stickerEdited = new EventEmitter <Sticker>();
  @Output() stickerDelete = new EventEmitter <number>();
  turnOnEditing(){
    // this.initId = this.getTypeId(this.initId)
    this.editing = true
    this.stickerForm.get('title')?.setValue(this.data.title)
    this.stickerForm.get('text')?.setValue(this.data.text)
    this.stickerForm.get('type')?.setValue(this.initId)
    this.oldTitle = this.data.title 
    this.oldText = this.data.text 
    this.oldDate = this.data.date 
  }
  turnOffEditing(ending:boolean){
    if(ending){
      let values = this.stickerForm.value
      this.data.title = values.title
      this.data.text = values.text
      this.data.typeId = parseInt(values.type)
      this.data.lastEdited = Date.now()
      // this.stickerEdited.emit(this.data)
    }else{

    }
    this.editing = false
  }
  
  deleteSticker() {
    this.stickerDelete.emit(this.data.id)
  }
  ngOnInit(): void {
    const controls = {
      title: ["",[Validators.required,Validators.maxLength(30)]],
      text: ["",[Validators.required,Validators.maxLength(100)]],
      type: [0,[Validators.maxLength(15)]]
    }
    this.stickerForm = this.fb.group(controls)
    let buf = Object.assign({}, this.data)
    this.initId = this.data.type
    
  }

}
