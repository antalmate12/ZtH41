import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {RouterModule} from '@angular/router';

import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,
} from '@angular/material';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';





import { AppComponent } from './app.component';
import { LoginCompComponent } from './login-comp/login-comp.component';
import { LoggedinCompComponent } from './loggedin-comp/loggedin-comp.component';

import { UsersService } from './service/users.service';
import { CommentComponent } from './loggedin-comp/comment/comment.component';
import { OverlayService } from './service/overlay.service';
import { TranslationService } from './service/translation.service';
import { TranslatePipe } from './service/translate.pipe';


@NgModule({
  exports: [
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
  ]
})
export class DemoMaterialModule {}


@NgModule({
  imports:[

    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    DemoMaterialModule,
    MatNativeDateModule,

      RouterModule.forRoot([
      {
        path: '', 
        component:LoggedinCompComponent, 
        pathMatch:'full'
      },            
      {
        path: 'questions/:id',
        component: CommentComponent,
        pathMatch: 'full',
      },
    ])
  
  ],
  declarations: [ AppComponent, LoginCompComponent, LoggedinCompComponent, CommentComponent, TranslatePipe ],
  bootstrap:    [ AppComponent ],
  providers: [UsersService, OverlayService, TranslationService],
  entryComponents: [ LoginCompComponent ],

})

export class AppModule { }
