import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {OverlayService}from '../service/overlay.service';


export class Post {
  id: number;
  cim: string;
  leir: string;
  iro: string;
  mikor: string;
}

@Injectable()
export class UsersService {

  private user = new BehaviorSubject<string>('');
  cast = this.user.asObservable();

  private author = new BehaviorSubject<string>('');
  castat = this.user.asObservable();

  constructor() { }

  poster:string;
  getPoster() {
    return this.poster;
  }
  setPoster(obj) {
    this.poster=obj;
  }

  editUser(newUser) {
    this.user.next(newUser);
  }

  actualPost: Post;
  getPost() {
    return this.actualPost;
  }
  setPost(obj) {
    this.actualPost = obj;
  }   
}