import { Component,  EventEmitter,  OnInit, Output } from '@angular/core';
import { HeaderComponent } from '../../../../layouts/authorized/componenet/header/header.component';
import { HeaderTitleComponent } from '../../../../layouts/authorized/componenet/header-title/header-title.component';
import { TaskInfo } from '../../../../core/models/task-info';
import { CommonModule, DatePipe } from '@angular/common';
import { TaskService } from '../../services/task-service.service';
import { EditTaskComponent } from '../../../../shared/components/edit-task/edit-task.component';
import { FormsModule } from '@angular/forms';
import { MatDialog,MatDialogRef } from '@angular/material/dialog';
import { ResponseDetails } from '../../../../core/models/response-details';
import { TaskComponent } from '../../../../shared/components/task/task.component';
import { MediaSizeService } from '../../../../shared/services/media-size.service';

@Component({
  selector: 'app-active-tasks',
  standalone: true,
  imports: [HeaderComponent, HeaderTitleComponent, TaskComponent, CommonModule,EditTaskComponent,FormsModule],
  templateUrl: './active-tasks.component.html',
  styleUrl: './active-tasks.component.css',
  providers: [DatePipe]
})
export class ActiveTasksComponent implements OnInit{
  openDivIndex: number | undefined;
  currentDate:string|undefined; 
  isEditTaskClicked:boolean=false;
  modalDialogRef:MatDialogRef<EditTaskComponent,any>|undefined;
  taskDetails:TaskInfo|undefined;
  @Output() editTaskEmitter=new EventEmitter<boolean>();
  responseDetails:ResponseDetails={isSuccess:false,message:""};
  mediaSize: string | undefined;
  timeDifference:string|undefined;

  constructor(private datePipe:DatePipe,private taskApi:TaskService,private matDialog:MatDialog, private mediaService: MediaSizeService) {
    this.currentDate=this.datePipe.transform(new Date(),'EEEE, dd MMMM yyyy')?.toString();
  }

  taskList: TaskInfo[] = [];

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
    this.mediaSize=this.mediaService.getMediaSize();
    this.taskApi.getActiveTasks();
    this.fetchTasks();
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
    this.taskApi.deleteTaskById(Id,"active-tasks").subscribe({
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

  OnClickEditIcon(task:TaskInfo){
    this.modalDialogRef=this.matDialog.open(EditTaskComponent,{
      data:task,
    });
    this.editTaskEmitter.emit(true);
    this.isEditTaskClicked=true;
    this.modalDialogRef.componentInstance.closeEditTaskEvent.subscribe(()=>{
      this.isEditTaskClicked=false;
      this.responseDetails.isSuccess=false,
      this.responseDetails.message="unable edit data";
      this.editTaskEmitter.emit(false);
    })
  }
  
  updateStatus(status:string,task:TaskInfo){
    task.Status=status;
    this.taskApi.updateTaskById(task,"active-tasks").subscribe({
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