import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {HomepageComponent} from "../../components/homepage/homepage.component";
import {AuthGuard} from "../../components/user/guards/auth.guard";

const routes:Routes=[
  {path:'',component:HomepageComponent},
  {path:'login',loadChildren:()=>import('../user/user.module').then(m=>m.UserModule)},
  {path:'kanban',loadChildren:()=>import('../kanban/kanban.module').then(m=>m.KanbanModule),canActivate:[AuthGuard]}
]
@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes,{initialNavigation:'enabled'})
  ],
  exports:[
    RouterModule
  ]
})
export class AppRoutingModule { }
