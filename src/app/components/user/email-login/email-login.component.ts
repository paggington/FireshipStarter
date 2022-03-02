import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AngularFireAuth} from "@angular/fire/compat/auth";

@Component({
  selector: 'app-email-login',
  templateUrl: './email-login.component.html',
  styleUrls: ['./email-login.component.css']
})
export class EmailLoginComponent implements OnInit {
  formGroup!:FormGroup;
  type:'login'|'signup'|'reset'='signup';
  loading=false;

  serverMessage!:string;

  constructor(private afAuth:AngularFireAuth,private forms:FormBuilder) { }

  ngOnInit(): void {
    this.formGroup=this.forms.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(6)]],
      passwordConfirm:['',[]]
    });
  }
  changeType(val:any){
    this.type=val;
  }
  get isLogin(){
    return this.type==='login';
  }
  get isSignup(){
    return this.type==='signup';
  }
  get isReset(){
    return this.type==='reset';
  }
  get email(){
    return this.formGroup.get('email');
  }
  get password(){
    return this.formGroup.get('password');
  }
  get passwordConfirm(){
    return this.formGroup.get('passwordConfirm');
  }
  get passwordDoesMatch(){
    if(this.type!=='signup'){
      return true;
    }else{
      return this.password?.value===this.passwordConfirm?.value;
    }
  }
  async onSubmit(){
    this.loading=true;

    const email=this.email?.value;
    const password=this.password?.value;
    try{
      if(this.isLogin){
        await this.afAuth.signInWithEmailAndPassword(email,password);
      }
      if(this.isSignup){
        await this.afAuth.createUserWithEmailAndPassword(email,password);
      }
      if(this.isReset){
        await this.afAuth.sendPasswordResetEmail(email);
        this.serverMessage='Check your Email';
      }
    }catch (err){
      // @ts-ignore
      this.serverMessage=err;
    }
    this.loading=false;
  }
}
