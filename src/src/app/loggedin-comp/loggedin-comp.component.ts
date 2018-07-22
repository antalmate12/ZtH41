import { Component, OnInit } from '@angular/core';
import { UsersService } from '../service/users.service';
import { Router } from '@angular/router';
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';

import { LoginCompComponent } from '../login-comp/login-comp.component'
import { OverlayReference } from '../login-comp/overlay-ref'

import { OverlayService } from '../service/overlay.service';

import {MatSnackBar} from '@angular/material';

import {TranslationService} from '../service/translation.service';

export class Post {
  id: number;
  cim: string;
  leir: string;
  iro: string;
  mikor: string;
}



@Component({
  selector: 'app-loggedin-comp',
  templateUrl: './loggedin-comp.component.html',
  styleUrls: ['./loggedin-comp.component.css']
})

export class LoggedinCompComponent implements OnInit {

  Posts: Post[] = [];
  sortedPosts: Post[] = [];

  loggedInName;

  constructor(
    private usersService: UsersService,
    private overlay: Overlay,
    private overlayService:OverlayService,
    public snackBar: MatSnackBar,
    private translationService: TranslationService,
    private router: Router
  ) {
    this.usersService.cast.subscribe(user => this.loggedInName = user);

    var retrievedData = localStorage.getItem("posts");

    //HA VAN A MEMÓRIÁBAN ADAT
    if (retrievedData != null) {
      this.Posts = JSON.parse(retrievedData);
    }
    //ha nincs
    else {
      this.Posts = [];
    }

this.usersService.cast.subscribe(user => this.loggedInName = user);
    //this.open();

//ÁLLÍTS VISSZA MAJD!!
if(this.loggedInName=="" ) {
     this.overlayService.open();
     //this.overlayService.startclose();
    } else {}

  }

  ngOnInit() {
    this.sortedPosts = this.Posts.sort((b, a) => (new Date(a.mikor).getTime() - new Date(b.mikor).getTime()));
    this.usersService.cast.subscribe(user => this.loggedInName = user);


    //console.log("én vagyok itt:"+this.loggedInName);
  }

  //ÚJ KÉRDÉS
  //----------------
  addNewPost(cim, iras) {
    if(this.loggedInName=="") {
      this.openSnackBar(this.translationService.translate("lepjbe"));
    }else {

    
    //HA A CÍM !=""
    if (cim != "") {
      //HA A LEÍRÁS !=""
      if (iras != "") {
        //ÚJ ADAT FELVÉTEL
        //----------------
        var id = this.Posts.length;

        this.Posts.push({
          id: id,
          cim: cim,
          leir: iras,
          iro: this.loggedInName,
          mikor: this.nowDate(),
        });
        //----------------

        //IDŐREND
        //----------------
        this.sortedPosts = this.Posts.sort((b, a) =>
          (new Date(a.mikor).getTime() - new Date(b.mikor).getTime()));
        //----------------

        //ADATOK LEMENTÉSE
        //----------------
        localStorage.setItem("posts",
          JSON.stringify(this.Posts));
        //----------------

        //HIBAÜZENETEK
        //----------------
      } else {
        this.openSnackBar(this.translationService.translate("nemjo"));
      }
    } else {
this.openSnackBar(this.translationService.translate("nemjo"));    }
    //----------------
  }}
  //----------------



  //TO INFINITY AND BEYOND
  //----------------
  navigateTo(id: number) {
    //rendezve van, megkeressük hanyadik elem
    var realid = this.callMeMaybe(id);

    //KIVÁLASZTOTT KÉRDÉS ADATOK LEMENTÉSE
    //----------------
    localStorage.setItem("questclicked",
      JSON.stringify(this.Posts[realid]));
    this.usersService.setPoster(this.Posts[realid].iro);
    //----------------

    //NAVIGÁCIÓ A VÁLASZOKHOZ
    //----------------
    console.log("nav:", realid);
    this.router.navigate(['questions', realid]);
    //----------------
  }
  //----------------



  //JELENLEGI DÁTUM, FORMÁTUM(YYYY.MM.DD HH:MM:SS)
  //----------------
  nowDate() {
    var x = new Date();
    var y = x.getFullYear().toString();
    var m = (x.getMonth() + 1).toString();
    var d = x.getDate().toString();
    var h = x.getHours().toString();
    var min = x.getMinutes();
    var asd = x.getSeconds();
    (d.length == 1) && (d = '0' + d);
    (m.length == 1) && (m = '0' + m);
    var date = y + "." + m + "." + d + " " + h + ":" + min + ":" + asd;
    return date;
  }
  //----------------


  //----------------
  //and here's my id
  //so
  callMeMaybe(obj) {
    //  ¯\_(ツ)_/¯
    var i = 0;
    var realid;
    while (true) {
      if (this.Posts[i].id == obj) {
        realid = i;
        break;
      } else {
        i++;
      }
    }
    return realid;
  }
  //----------------


  dummyopen() {
    //this.overlayService.open();
    //this.openSnackBar("asd");
  }
  
  openSnackBar(obj) {
    this.snackBar.open(obj, 'Bezár', {
  duration: 3000
});
  }
}