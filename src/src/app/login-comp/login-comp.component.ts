import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UsersService } from '../service/users.service';
import { OverlayService } from '../service/overlay.service';

import { TranslatePipe } from '../service/translate.pipe';
import { TranslationService } from '../service/translation.service';

import { MatButtonModule, MatCheckboxModule } from '@angular/material';

import { OverlayReference } from '../login-comp/overlay-ref';

import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-login-comp',
  templateUrl: './login-comp.component.html',
  styleUrls: ['./login-comp.component.css']
})
export class LoginCompComponent implements OnInit {

  login: string = "asd";


  Users: string[] = [];

  public loggedInName: string;

  constructor(
    private router: Router,
    private usersService: UsersService,
    private overlay: OverlayService,
    private translationService: TranslationService,
    //private pipe:TranslatePipe,
    public snackBar: MatSnackBar,

  ) { }

  ngOnInit() {
    this.usersService.cast.subscribe(user => this.loggedInName = user);

  }

  inArray(item, array) {
    if (array.includes(item)) { return true; }
    else { return false; }
  }

  btnClicked(obj) {
    //BETÖLTJÜK MEMÓRIÁBÓL A TÖMB TARTALMÁT
    //------------------------------
    var retrievedData = localStorage.getItem("usersarray");
    //HA NEM NULLA
    if (obj == "") {
      this.openSnackBar(this.translationService.translate("nemjo"));
    } else {
      //HA VAN A MEMÓRIÁBAN ADAT
      if (retrievedData != null) {
        this.Users = JSON.parse(retrievedData);

        if (this.inArray(obj, this.Users)) {
          //ha már "regisztrált" az emberünk
          //------------
          this.loggedInName = obj;
          this.usersService.editUser(this.loggedInName);
          this.overlay.startclose();
          this.openSnackBar(this.translationService.translate("udv") + this.loggedInName);
        }
        else {
          //ha még nem
          //------------
          this.Users.push(obj);
          /*console.log("Users:");
          console.log(this.Users);*/
          this.loggedInName = obj;
          this.usersService.editUser(this.loggedInName);
          //új adat lementése
          //------------
          localStorage.setItem("usersarray",
            JSON.stringify(this.Users));
          //------------
          this.overlay.startclose();
          this.openSnackBar(this.translationService.translate("udv") + this.loggedInName);
          //------------
        }
      }
      //HA NINCS A MEMÓRIÁBAN ADAT
      else {
        if (obj == null) {
          this.openSnackBar(this.translationService.translate("nemjo"));
        }
        else {
          //ha még nem
          //------------
          this.Users.push(obj);
          /*console.log("Users:");
          console.log(this.Users);*/
          this.loggedInName = obj;
          this.usersService.editUser(this.loggedInName);
          //új adat lementése
          //------------
          localStorage.setItem("usersarray",
            JSON.stringify(this.Users));
          this.overlay.startclose();
          this.openSnackBar("Üdv újra itt, " + this.loggedInName);
          //------------
        }
      }
    }
  }
  openSnackBar(obj) {
    this.snackBar.open(obj, 'Bezár', {
      duration: 3000
    });
  }
}