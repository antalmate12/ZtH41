import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../service/users.service';
import {MatSnackBar} from '@angular/material';


import {TranslationService} from '../../service/translation.service';

export class Comment {
  postid: number;
  id: number;
  leir: string;
  iro: string;
  accepted: number;
  mikor: string;
}
export class Post {
  id: number;
  cim: string;
  leir: string;
  iro: string;
  mikor: string;
}

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  statusesMap = {
    1: 'accept',
    2: 'deny',
    0: 'clear'
  }

  post: Post;
  author: string;
  poster: string;

  loggedInName: string;
  postId: number;
  postComments: Comment[] = [];
  actualComments: Comment[] = [];
  
  constructor(
    private usersService: UsersService,
    public snackBar: MatSnackBar,
        private translationService: TranslationService,

    ) {

    this.usersService.cast.subscribe(user =>
      this.loggedInName = user);
    console.log(this.loggedInName);

    //--
    var retrievedData =
      localStorage.getItem("questclicked");

    this.post = JSON.parse(retrievedData);




    var retrievedData = localStorage.getItem("postcomments");
    if (retrievedData != null) {
      this.postComments = JSON.parse(retrievedData);
    }
    else {
      this.postComments = [];
    }


    this.usersService.castat.subscribe(author => this.author = author);
    this.poster = this.usersService.getPoster();
    console.log("Belépett user: " + this.loggedInName)
    console.log("Író: " + this.poster);

  }

  ngOnInit() {
    var retrievedData = localStorage.getItem("questclicked");
    this.post = JSON.parse(retrievedData);
    //--
    this.getActualComment();

    var retrievedData = localStorage.getItem("postcomments");
    if (retrievedData != null) {
      this.postComments = JSON.parse(retrievedData);
    }
    else {
      this.postComments = [];
    }
  }


  //AZ AKTUÁLIS KÉRDÉS VÁLASZAI
  //----------------
  getActualComment() {
    var i = 0;
    this.actualComments =
      this.postComments.filter((item) => item.postid === this.post.id);
  }
  //----------------



  //ÚJ VÁLASZ
  //----------------
  addNewAnswer(leir) {
    if(this.loggedInName!="") {
    //ELLENŐRZÉS
    if (leir != "") {

      //ÚJ ADAT FELVITEL
      //----------------
      var idd = this.postComments.length;
      this.postComments.push({
        postid: this.post.id,
        id: idd,
        leir: leir,
        iro: this.loggedInName,
        accepted: 0,
        mikor: this.nowDate()
      });
      //----------------

      //IDŐREND
      //----------------
      this.postComments.sort((b, a) =>
        (new Date(a.mikor).getTime() - new Date(b.mikor).getTime()));
      //----------------

      //SAVE COMMENTS
      //----------------
      localStorage.setItem("postcomments",
        JSON.stringify(this.postComments));
      //----------------

      //EHEZ A POSTHOZ TARTOZÓ VÁLASZOK
      //----------------
      this.getActualComment();
      //----------------
    }
    else {
      //HA ÜRES
      this.openSnackBar(this.translationService.translate("nemjo"));
    }
  } else {
    this.openSnackBar(this.translationService.translate("lepjbe"))
  }
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
    var min = x.getMinutes(); var asd = x.getSeconds();
    (d.length == 1) && (d = '0' + d);
    (m.length == 1) && (m = '0' + m);
    var date = y + "." + m + "." + d + " " + h + ":" + min + ":" + asd;
    return date;
  }
  //----------------

  answerid(iro, mikor, iras) {
    //ez hanyadik elem?
    var i = 0;
    var x = 0;
    while (true) {
      if (this.actualComments[i].iro == iro
        && this.actualComments[i].mikor == mikor
        && this.actualComments[i].leir == iras) {

        x = i;
        break;
      }
      else {
        i++;
      }
    }
    return x;
  }


//VÁLASZOK MEGJELÖLÉSE
//----------------
  //HELYES VÁLASZ
  //----------------
  acceptAnswer(iro, mikor, iras) {   
    if (this.loggedInName == this.poster) {
      var x = this.answerid(iro, mikor, iras);
      this.actualComments[x].accepted = 1;
      this.saveAnswer(iro, mikor, iras, x);
    } else {
      console.log(this.postComments);
      this.openSnackBar(this.translationService.translate("enged"));
    }
  }
  //----------------

  //JELÖLÉS TÖRLÉSE
  //----------------
  clearAnswer(iro, mikor, iras) {
    if (this.loggedInName == this.poster) {
      var x = this.answerid(iro, mikor, iras);
      this.actualComments[x].accepted = 0;
      this.saveAnswer(iro, mikor, iras, x);
    } else {
      this.openSnackBar(this.translationService.translate("enged"));
    }
  }
  //----------------

  //ROSSZ VÁLASZ
  //----------------
  denyAnswer(iro, mikor, iras) {
    if (this.loggedInName == this.poster) {
      var x = this.answerid(iro, mikor, iras);
      this.actualComments[x].accepted = 2;
      this.saveAnswer(iro, mikor, iras, x);
    } else {
      this.openSnackBar(this.translationService.translate("enged"));
    }
  }
  //----------------
//----------------


//VÁLASZOK MENTÉSE
//----------------
  saveAnswer(iro, mikor, iras, x) {
    //REFRESH POST COMMENTS
    var i = 0;
    for (i = 0; i < this.postComments.length; i++) {
      if (this.postComments[i].postid == this.post.id
        && this.postComments[i].iro == iro
        && this.postComments[i].mikor == mikor
        && this.postComments[i].leir == iras) {
        this.postComments[i].accepted
          = this.actualComments[x].accepted;
      }
    }
    //SAVE REFRESHED ARRAY
    localStorage.setItem
      ("postcomments", JSON.stringify(this.postComments));
    //REFRESH ACTUAL COMMENTS
    this.getActualComment();
    console.log("post");
    console.log(this.postComments);
    console.log("actual");

    console.log(this.actualComments);
  }
  
//----------------

openSnackBar(obj) {
    this.snackBar.open(obj, 'Bezár', {
  duration: 3000
});
  }
}