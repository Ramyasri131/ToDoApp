import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../../../layouts/authorized/componenet/header/header.component';
import { HeaderTitleComponent } from '../../../../layouts/authorized/componenet/header-title/header-title.component';
import { TaskInfo } from '../../../../core/models/task-info';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { TaskService } from '../../services/task-service.service';
import { TaskComponent } from '../../../../shared/components/task/task.component';
import { MediaSizeService } from '../../../../shared/services/media-size.service';
import { generate } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HeaderComponent, HeaderTitleComponent, TaskComponent, CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  providers: [DatePipe]
})
export class DashboardComponent implements OnInit {
  currentDatetime: string | undefined;
  taskList: TaskInfo[] = [];
  mediaSize: string = "";
  completedPercentage: number=0;
  activePercentage: number = 0;

  constructor(private datePipe: DatePipe, private taskApi: TaskService, private mediaService: MediaSizeService) {
    this.currentDatetime = this.datePipe.transform(new Date(), 'EEEE, dd MMMM yyyy')?.toString();
  }

  ngOnInit(): void {
    this.taskApi.getAllTasks();
    this.fetchTasks();
    this.mediaSize=this.mediaService.getMediaSize();
    // this.taskApi.allTaskObservable.subscribe({
    //   next: t => {
    //     this.fetchTasks();
    //     this.generatePercentage(t);
    //   }
    // })
  }

  fetchTasks() {
    this.taskApi.allTasks$.subscribe({
      next: (data: TaskInfo[]) => {
        this.taskList = data.map(obj => new TaskInfo(obj));
        this.generatePercentage(this.taskList);
      },
      error: (errorResponse: any) => {
        console.log(errorResponse.error);
      },
      complete: () => console.info('complete'),
    });
  }

  
  generatePercentage(taskList:any) {
    let allTasks = this.taskList.length;
    let completedTasks = 0;
    let activeTasks = 0;
    for (let item of this.taskList) {
      if (item.Status == 'Active') {
        activeTasks++;
      }
      else {
        completedTasks++;
      }
    }
    this.completedPercentage = Math.ceil((completedTasks * 100) / allTasks);
    this.activePercentage = Math.ceil((activeTasks * 100) / allTasks);
  }

  deleteAllTasks() {
    this.taskApi.deleteAllTasks().subscribe({
      next: t => {
        console.log("All tasks are deleted");
      },
      error: (errorResponse: any) => {
        console.log(errorResponse.error);
      },
      complete: () => console.info('complete')
    });
  }

  updateStatus(status: string, task: TaskInfo) {
    task.Status = status;
    console.log(task.Status);
    this.taskApi.updateTaskById(task,"dashboard").subscribe({
      next: t => {
        console.log("task updated");
      },
      error: (errorResponse: any) => {
        console.log(errorResponse.error);
      },
      complete: () => {
        console.log("complete");
      }
    })
  }
}