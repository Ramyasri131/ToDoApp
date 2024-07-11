import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';

const routes: Routes =[
  {
    path: 'login', component: LoginPageComponent
  },
  {
    path:'sign-up',component:SignUpComponent
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,RouterModule.forChild(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class AuthModule { }
