import { Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';
import { DashboardComponent } from './modules/home/components/dashboard/dashboard.component';
import { ActiveTasksComponent } from './modules/home/components/active-tasks/active-tasks.component';
import { CompletedTasksComponent } from './modules/home/components/completed-tasks/completed-tasks.component';
import { SignUpComponent } from './modules/auth-pages/components/sign-up/sign-up.component';
import { LoginPageComponent } from './modules/auth-pages/components/login-page/login-page.component';
import { AddTaskComponent } from './shared/components/add-task/add-task.component';
import { CommonModule } from '@angular/common';
import { ResponseDetails } from './core/models/response-details';
import { PageLayoutService } from './core/services/page-layout.service';
import { PageLayout } from './core/enums/page-layout';
import { AuthorizedLayoutComponent } from './layouts/authorized/authorized-layout/authorized-layout.component';
import { UnauthorizedLayoutComponent } from "./layouts/un-authorized/unauthorized-layout/unauthorized-layout.component";


@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, RouterModule, AddTaskComponent, CommonModule, AuthorizedLayoutComponent, UnauthorizedLayoutComponent]
})

export class AppComponent{
  title = 'WebApp';
  pageLayout = {Authorized:'authorized',UnAuthorized:'unauthorized'};

  constructor(private router: Router,public pageLayoutService:PageLayoutService){

  }
}