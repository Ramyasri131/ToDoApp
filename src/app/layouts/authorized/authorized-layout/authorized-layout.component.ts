import { Component } from '@angular/core';
import { ActiveTasksComponent } from '../../../modules/home/components/active-tasks/active-tasks.component';
import { MediaSizeService } from '../../../shared/services/media-size.service';
import { SideBarComponent } from '../componenet/side-bar/side-bar/side-bar.component';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AddTaskComponent } from '../../../shared/components/add-task/add-task.component';
import { CompletedTasksComponent } from '../../../modules/home/components/completed-tasks/completed-tasks.component';
import { DashboardComponent } from '../../../modules/home/components/dashboard/dashboard.component';
import { MobileviewHeaderComponent } from '../componenet/mobileview-header/mobileview-header.component';
import { ResponseDetails } from '../../../core/models/response-details';

@Component({
  selector: 'app-authorized-layout',
  standalone: true,
  imports: [SideBarComponent,RouterModule,AddTaskComponent,RouterOutlet,DashboardComponent, ActiveTasksComponent, CompletedTasksComponent,CommonModule,MobileviewHeaderComponent],
  templateUrl: './authorized-layout.component.html',
  styleUrl: './authorized-layout.component.css'
})
export class AuthorizedLayoutComponent {
  taskAdded:boolean=false;
  isAddTaskClicked:boolean=false;
  editEvent:ActiveTasksComponent|undefined;
  isEditOpen:boolean=false;
  mediaSize: string | undefined;

  constructor(private mediaService: MediaSizeService){

  }

  ngOnInit(): void {
    this.mediaSize=this.mediaService.getMediaSize();
  }

  onAddTaskComplete(addTaskResult:ResponseDetails){
    if(addTaskResult.isSuccess){
      this.taskAdded=true;
    }
  }

  closePopup() {
    this.isAddTaskClicked = false;
  }

  openPopup() {
    this.isAddTaskClicked = true;
  }

  subscribeTochildEmitter(componentRef:any){
    if(!(componentRef instanceof ActiveTasksComponent))
    {
      return;
    }
    componentRef.editTaskEmitter.subscribe((t:boolean)=>{
      this.isEditOpen=t;
    })
  }
}
