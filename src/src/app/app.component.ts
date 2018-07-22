import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import { UsersService } from './service/users.service';
//import { OverlayService } from './service/overlay.service';


import {TranslationService} from './service/translation.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  name = 'Angular 6';
  constructor(
    private router: Router,
    private usersService: UsersService,
    public translationService: TranslationService,
    //private overlayService:OverlayService,

) { }

  exitClick() {
    this.usersService.editUser("");
    this.router.navigateByUrl('');
    //this.overlayService.open();
  }
  loginClick() {
    
  }
  qaClick() {
      this.router.navigateByUrl('');
  }

}
