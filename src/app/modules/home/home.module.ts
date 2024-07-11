import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ActiveTasksComponent } from './components/active-tasks/active-tasks.component';
import { CompletedTasksComponent } from './components/completed-tasks/completed-tasks.component';

const routes: Routes =[
  {
    path: 'dashboard', component: DashboardComponent
  },
  {
    path:'active-tasks',component:ActiveTasksComponent
  },
  {
    path:'completed-tasks',component:CompletedTasksComponent
  },
  {
    path:'',redirectTo:'dashboard',pathMatch:'full'
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})



export class HomeModule { }
