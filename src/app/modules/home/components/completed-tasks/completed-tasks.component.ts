import { Component } from '@angular/core';
import { HeaderComponent } from '../../../../layouts/authorized/componenet/header/header.component';
import { HeaderTitleComponent } from '../../../../layouts/authorized/componenet/header-title/header-title.component';
import { TaskComponent } from '../../../../shared/components/task/task.component';
import { TaskInfo } from '../../../../core/models/task-info';
import { CommonModule, DatePipe } from '@angular/common';
import { TaskService } from '../../services/task-service.service';

@Component({
  selector: 'app-completed-tasks',
  standalone: true,
  imports: [HeaderComponent,HeaderTitleComponent,TaskComponent,CommonModule],
  templateUrl: './completed-tasks.component.html',
  styleUrl: './completed-tasks.component.css',
  providers:[DatePipe]
})
export class CompletedTasksComponent {
  openDivIndex:number|undefined;
  currentDate:string|undefined;
  taskList: TaskInfo[] = [];
  timeDifference: string | undefined;


  constructor(private datePipe:DatePipe,private taskApi:TaskService){
   this.currentDate=this.datePipe.transform(new Date(),'EEEE, dd MMMM yyyy')?.toString();
  }


  openToolTip(i: number,item:TaskInfo) {
    this.openDivIndex = this.openDivIndex == i ? undefined : i;
    const startTime=new Date(item.CreatedDate);
    const endTime=new Date();
    if(endTime.getHours()-startTime.getHours()>1)
    {
      this.timeDifference=`${(endTime.getHours()-startTime.getHours()).toString()} hours`;
    }
    else if(endTime.getMinutes()-startTime.getMinutes()>1)
    {
      this.timeDifference=`${(endTime.getMinutes()-startTime.getMinutes()).toString()} minutes`;
    }
    else{
      this.timeDifference=`${(endTime.getSeconds()-startTime.getSeconds()).toString()} seconds`;
    }
  }

  ngOnInit(): void {
    this.taskApi.getCompletedTasks();
    this.fetchTasks();
    // this.mediaSize=this.mediaService.getMediaSize();
    // console.log(this.mediaSize);
    // this.taskApi.allTasks$.subscribe({
    //   next:t=>{
    //     this.fetchTasks();
    //   }  
    // })
  }

  fetchTasks(){
    this.taskApi.allTasks$.subscribe({
      next: t => {
        this.taskList=t.map(obj=>new TaskInfo(obj));
      },
      error: (errorResponse: any) => {
        console.log(errorResponse.error);
      },
      complete: () => console.info('complete'),
    });
  }

  deleteTaskById(Id:number){
    this.taskApi.deleteTaskById(Id,"completed-tasks").subscribe({
      next:t=>{
        console.log("task deleted");
      },
      error:(errorResponse:any)=>{
        console.log(errorResponse.error);
      },
      complete:()=>{
        console.log("complete");
      }
    });
  }

  updateStatus(status:string,task:TaskInfo){
    task.Status=status;
    console.log(task.Status);
    this.taskApi.updateTaskById(task,"completed-tasks").subscribe({
      next:t=>{
        console.log("task updated");
      },
      error:(errorResponse:any)=>{
        console.log(errorResponse.error);
      },
      complete:()=>{
        console.log("complete");
      }
    })
  }
}