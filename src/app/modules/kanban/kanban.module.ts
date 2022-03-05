import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KanbanRoutingModule } from './kanban-routing.module';
import {SharedModule} from "../shared/shared.module";
import {FormsModule} from "@angular/forms";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {BoardListComponent} from "../../components/board-list/board-list.component";
import {BoardComponent} from "../../components/board/board.component";
import {BoardDialogComponent} from "../../components/kanban/dialog/board-dialog.component";
import {RouterModule} from "@angular/router";


@NgModule({
  declarations: [
    BoardDialogComponent,
    BoardListComponent,
    BoardComponent],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    KanbanRoutingModule,
    FormsModule,
    DragDropModule,
    MatDialogModule,
    MatButtonToggleModule,
  ]
})
export class KanbanModule { }
