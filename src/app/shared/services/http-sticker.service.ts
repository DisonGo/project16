import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Sticker } from '../interface/sticker.interface';
import { StickerType } from '../interface/type.interface';

@Injectable({
  providedIn: 'root'
})
export class HttpStickerService {

  constructor(private http: HttpClient) { }
  stickerRoute = "http://localhost:3000/stickers/"
  typeRoute = "http://localhost:3000/types/"
  getStickers(): Promise<Sticker[]>{
    return this.http.get<Sticker[]>(this.stickerRoute+"?_expand=type").toPromise()
  }
  getSticker(id:number): Promise<Sticker>{
    return this.http.get<Sticker>(this.stickerRoute+id+"/?_expand=type").toPromise()
  }
  postSticker(data:Sticker): Promise<Sticker>{
    return this.http.post<Sticker>(this.stickerRoute,data).toPromise()
  }

  deleteSticker(id:number): Promise<Sticker>{
    return this.http.delete<Sticker>(this.stickerRoute+id).toPromise()
  }

  editSticker(data:Sticker): Promise<Sticker>{
    return this.http.patch<Sticker>(this.stickerRoute+data.id,data).toPromise()
  }
  
  getStickerTypes(): Promise<StickerType[]>{
    return this.http.get<StickerType[]>(this.typeRoute).toPromise()
  }
  
  getStickerType(id:number): Promise<StickerType>{
    return this.http.get<StickerType>(this.typeRoute+id).toPromise()
  }

  postStickerType(data:StickerType): Promise<StickerType>{
    return this.http.post<StickerType>(this.typeRoute,data).toPromise()
  }

  deleteStickerType(id:number): Promise<StickerType>{
    return this.http.delete<StickerType>(this.typeRoute+id).toPromise()
  }

  editStickerType(data:StickerType): Promise<StickerType>{
    return this.http.patch<StickerType>(this.typeRoute+data.id,data).toPromise()
  }
}
