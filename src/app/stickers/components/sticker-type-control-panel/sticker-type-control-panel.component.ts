import { Component,EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  animation,
} from '@angular/animations';
import { StickerType } from '../../../shared/interface/type.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpStickerService } from '../../../shared/services/http-sticker.service';

@Component({
  selector: 'app-sticker-type-control-panel',
  templateUrl: './sticker-type-control-panel.component.html',
  styleUrls: ['./sticker-type-control-panel.component.css'],
  animations: [
    trigger('openClose', [
      state('open', style({
        height: '*'
      })),
      state('closed', style({
        height: '1em'
      })),
      transition('open => closed', [
        animate('0.5s ease-in-out')
      ]),
      transition('closed => open', [
        animate('0.5s ease-in-out')
      ]),
    ]),
  ]
})
export class StickerTypeControlPanelComponent implements OnInit {
  isOpen = false
  stickerTypeForm!: FormGroup
  arrowSym = '&#8659;'
  closedHeight = '2em'
  @Input() stickerTypes!:StickerType[]
  @Output() stickerTypeEdited = new EventEmitter ()
  @Output() stickerTypePosted = new EventEmitter ()
  @Output() stickerTypeDeleted = new EventEmitter ()
  constructor(private fb: FormBuilder,private stickerServ:HttpStickerService) { }
  switchShow(){
    if(this.isOpen){
      this.isOpen = false
      this.arrowSym = '&#8659;'
    }
    else {
      this.isOpen = true
      this.arrowSym = '&#8657;'
    }
  }
  getType(id:number){
    return this.stickerTypes.find(el=>{
      return (el.id == id)
    })?.name
  }
  setInputValue(id:number){ 
    this.stickerServ.getStickerType(id).then(res=>{
      this.stickerTypeForm.get('name')?.setValue(res.name)
    })
  }
  typeChanged(){
    let id = parseInt(this.stickerTypeForm.get('type')?.value)
    this.setInputValue(id)
  }
  async createType(){
    let values = this.stickerTypeForm.value
    this.stickerTypes.sort((a,b)=>{
      return a.id-b.id
    })
    let newType = {
      id: this.stickerTypes[this.stickerTypes.length-1].id + 1,
      name: values.name
    }
    await this.stickerServ.postStickerType(newType)
    this.stickerTypePosted.emit()
    this.stickerTypeForm.get('name')?.setValue('None')
  }
  async editType(){
    let values = this.stickerTypeForm.value
    let newType = {
      id: parseInt(values.type),
      name: values.name
    }
    await this.stickerServ.editStickerType(newType)
    this.stickerTypeEdited.emit()
    this.stickerTypeForm.get('name')?.setValue('None')
  }
  async deleteType(){
    let values = this.stickerTypeForm.value
    let id = parseInt(values.type)
    await this.stickerServ.deleteStickerType(id)
    this.stickerTypeDeleted.emit()
    this.stickerTypeForm.get('name')?.setValue('None')
  }
  ngOnInit(): void {
    console.log(this.stickerTypes);
    
    const controls = {
      type: [0,[Validators.required]],
      name: [null,[Validators.required,Validators.maxLength(8)]]
    }
    this.stickerTypeForm = this.fb.group(controls)
    this.stickerTypeForm.get('type')?.setValue(0)
    this.setInputValue(0)
  }

}
