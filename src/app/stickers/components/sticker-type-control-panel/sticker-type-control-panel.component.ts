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
import { Router } from '@angular/router';

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
  stickerTypes!:StickerType[]
  @Output() stickerTypeEdited = new EventEmitter ()
  @Output() stickerTypePosted = new EventEmitter ()
  @Output() stickerTypeDeleted = new EventEmitter ()
  constructor(private fb: FormBuilder,private httpServ: HttpStickerService,private router:Router) { }
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
    this.httpServ.getStickerType(id).then(res=>{
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
    await this.httpServ.postStickerType(newType)
    // this.stickerTypePosted.emit()
    this.stickerTypeForm.get('name')?.setValue('None')
    this.getTypes()
  }
  async editType(){
    let values = this.stickerTypeForm.value
    let newType = {
      id: parseInt(values.type),
      name: values.name
    }
    await this.httpServ.editStickerType(newType)
    // this.stickerTypeEdited.emit()
    this.stickerTypeForm.get('name')?.setValue('None')
    this.getTypes()
  }
  async deleteType(){
    let values = this.stickerTypeForm.value
    let id = parseInt(values.type)
    await this.httpServ.deleteStickerType(id)
    // this.stickerTypeDeleted.emit()
    this.stickerTypeForm.get('name')?.setValue('None')
    this.getTypes()
  }
  async getTypes(){
    try{
      this.stickerTypes = await this.httpServ.getStickerTypes()
      console.log(this.stickerTypes);
      
    }catch(err){
      console.log(err);
    }
    
  }
  ngOnInit(): void {

    this.getTypes()
    const controls = {
      type: [0,[Validators.required]],
      name: [null,[Validators.required,Validators.maxLength(8)]]
    }
    this.stickerTypeForm = this.fb.group(controls)
    this.stickerTypeForm.get('type')?.setValue(0)
    this.setInputValue(0)
  }

}
