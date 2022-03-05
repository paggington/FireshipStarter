import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import {SharedModule} from "./modules/shared/shared.module";
import { HomepageComponent } from './components/homepage/homepage.component';
import {AppRoutingModule} from "./modules/app-routing/app-routing.module";
import {environment} from "../environments/environment";
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import {AngularFireModule} from "@angular/fire/compat";
import { BoardListComponent } from './components/board-list/board-list.component';
import { BoardComponent } from './components/board/board.component';
import {DragDropModule} from "@angular/cdk/drag-drop";
import { BoardDialogComponent } from './components/kanban/dialog/board-dialog.component';
import { TaskDialogComponent } from './components/kanban/dialog/task-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        LayoutModule,
        SharedModule,
        AppRoutingModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AngularFireAuthModule,
        DragDropModule,
        MatDialogModule
    ],
  providers: [],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
