import {Component, Input, OnInit} from '@angular/core';
import {BoardModel} from "../../modules/kanban/board.model";
import {BoardService} from "../../services/kanban/board.service";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  @Input()
  board?:BoardModel;
  constructor(private boardService:BoardService) {

  }

  ngOnInit(): void {
  }
  taskDrop(event:CdkDragDrop<string[]>){
    // @ts-ignore
    moveItemInArray(this.board?.tasks,event.previousIndex,event.currentIndex);
    this.boardService.updateTasks(this.board?.id, this.board?.tasks);
  }
}
