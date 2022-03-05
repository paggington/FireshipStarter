import {Component, OnDestroy, OnInit} from '@angular/core';
import {BoardModel} from "../../modules/kanban/board.model";
import {Subscription} from "rxjs";
import {BoardService} from "../../services/kanban/board.service";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import {MatDialog} from "@angular/material/dialog";
import {BoardDialogComponent} from "../kanban/dialog/board-dialog.component";

@Component({
  selector: 'app-board-list',
  templateUrl: './board-list.component.html',
  styleUrls: ['./board-list.component.css']
})
export class BoardListComponent implements OnInit,OnDestroy{
  boards:BoardModel[]=[];
  sub?:Subscription;
  constructor(public boardService:BoardService,public dialog:MatDialog) { }

  ngOnInit(): void {
    this.sub=this.boardService.getUserBoards().subscribe(boards=>this.boards=boards);
    console.log(this.boards)
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
  drop(event:CdkDragDrop<string[]>){
    moveItemInArray(this.boards,event.previousIndex,event.currentIndex);
    this.boardService.sortBoards(this.boards);
  }
  openBoardDialog():void{
    const dialogRef=this.dialog.open(BoardDialogComponent,{
      width:'400px',
      data:{}
    });
    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        this.boardService.createBoard({
          title:result,
          priority:this.boards.length
        })
      }
    });
  }
}
