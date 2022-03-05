import {Injectable} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {BoardModel, Task} from "../../modules/kanban/board.model";
import {switchMap} from "rxjs";
import {Firestore} from "@angular/fire/firestore";
import firebase from "firebase/compat/app";

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore) {
  }

  async createBoard(data: BoardModel) {
    const user = await this.afAuth.currentUser;

    return this.db.collection('boards').add({
      ...data,
      id: user?.uid,
      tasks: [{description: 'Hello', label: 'green'}]
    })
  }

  deleteBoard(boardId: string) {
    return this.db.collection('boards').doc(boardId).delete();
  }

  updateTasks(boardId: string | undefined, tasks: Task[] | undefined) {
    return this.db.collection('boards').doc(boardId).update({tasks});
  }

  removeTask(boardId: string, task: Task) {
    return this.db.collection('boards').doc(boardId).update({
      tasks: firebase.firestore.FieldValue.arrayRemove(task)
    })
  }

  getUserBoards() {
    return this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.db.collection<BoardModel>('boards', ref =>
            ref.where('uid', '==', user.uid).orderBy('priority')
          ).valueChanges({idField: 'uid'})

        } else {
          return [];
        }
      })
    )
  }

  sortBoards(boards: BoardModel[]) {
    const db = firebase.firestore();
    const batch = db.batch();

    const refs = boards.map(b => db.collection('boards').doc(b.id));
    refs.forEach((ref, idx) => batch.update(ref, {priority: idx}));
    batch.commit();
  }
}
