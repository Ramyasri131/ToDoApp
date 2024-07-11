import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Inject, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskInfo } from '../../../core/models/task-info';
import { Task } from '../../../core/models/task-model';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef, } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TaskService } from '../../../modules/home/services/task-service.service';


@Component({
  selector: 'app-edit-task',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,CommonModule,MatDialogModule],
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.css'
})
export class EditTaskComponent implements OnInit{
  @Output() closeEditTaskEvent=new EventEmitter<void>();
  @Output() taskEditEvent=new EventEmitter<Task>();
  editTask:TaskInfo|undefined;
  invalidMessage:string="";
  updatedTask:TaskInfo|undefined;
  
  editTaskForm=new FormGroup({
    editTitle:new FormControl('',[Validators.required]),
    editDescription:new FormControl('')
  })

  constructor(@Inject(MAT_DIALOG_DATA) private data:TaskInfo,private dialogRef:MatDialogRef<EditTaskComponent>,private router:Router,private taskApi:TaskService){
    this.editTask=new TaskInfo(this.data);
  }
 
  ngOnInit():void{
      this.editTaskForm.setValue({
      editTitle:this.editTask!.Title,
      editDescription:this.editTask!.Description
    })
  }

  closeEditTaskPopup(){
    this.editTaskForm.setValue({
      editTitle:this.editTask!.Title,
      editDescription:this.editTask!.Description
    })
    this.dialogRef.close();
    this.closeEditTaskEvent.emit();
  }

  saveTask(){
    if(!this.editTaskForm.invalid)
    {
      var model=this.editTaskForm.value;
      this.editTask!.Title=model.editTitle!,
      this.editTask!.Description=model.editDescription!,
      this.updatedTask=new TaskInfo(this.editTask);
      this.taskApi.updateTaskById(this.updatedTask,"active-tasks").subscribe({
        next:t=>{
          this.dialogRef.close();
          this.closeEditTaskEvent.emit();
        },
        error:(errorResponse)=>{
          console.log(errorResponse.error);
        }
      })
    }
    else{
      this.invalidMessage="Add Titile";
    }
  }
}