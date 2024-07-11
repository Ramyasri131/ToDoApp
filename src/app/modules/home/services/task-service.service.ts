import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { TaskInfo } from '../../../core/models/task-info';
import { Task } from '../../../core/models/task-model';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})

export class TaskService {

  token:string="";
  private allTasksSubject=new Subject<TaskInfo[]>();
  allTasks$=this.allTasksSubject.asObservable();

  constructor(private httpClient:HttpClient,private activeRoute:Router) {
   
 }

  getAllTasks():void{
    this.httpClient.get<TaskInfo[]>(`${environment.apiUrl}/Task/GetTasks`).subscribe(newData => this.allTasksSubject.next(newData))
  }

  addTask(task:Task){
    return this.httpClient.post(`${environment.apiUrl}/Task/AddTask`,task).pipe(tap(()=>{
      console.log(this.activeRoute.url);
      if(this.activeRoute.url=='/completed-tasks')
      {
        this.getCompletedTasks();
      }
      else if(this.activeRoute.url=='/active-tasks')
      {
        this.getActiveTasks();
      }
      else{
        this.getAllTasks();
      }
    }))
  }

  getActiveTasks():void{
    this.httpClient.get<TaskInfo[]>(`${environment.apiUrl}/Task/GetActiveTasks`).subscribe(newData=>this.allTasksSubject.next(newData));
  }

  getCompletedTasks():void{
    this.httpClient.get<TaskInfo[]>(`${environment.apiUrl}/Task/GetCompletedTasks`).subscribe(newData=>this.allTasksSubject.next(newData));
  }

  deleteTaskById(Id:number,requestPoint:string):Observable<string>{
    return this.httpClient.delete(`${environment.apiUrl}/Task/DeleteTask?Id=${Id}`,{
      responseType:'text'
    }).pipe(tap(()=>{
      if(requestPoint=='dashboard')
      {
        this.getAllTasks();
      }
      else if(requestPoint=='active-tasks')
      {
        this.getActiveTasks();
      }
      else if(requestPoint=='completed-tasks')
      {
        this.getCompletedTasks();
      }
    }))
  }

  updateTaskById(task:TaskInfo,requestPoint:string):Observable<Object>{
    return this.httpClient.put(`${environment.apiUrl}/Task/UpdateTask`,task).pipe(tap(()=>{
      if(requestPoint=='dashboard')
      {
        this.getAllTasks();
      }
      else if(requestPoint=='active-tasks')
      {
        this.getActiveTasks();
      }
      else if(requestPoint=='completed-tasks')
      {
        this.getCompletedTasks();
      }
    }))
  }

  deleteAllTasks(){
    return this.httpClient.delete(`${environment.apiUrl}/Task/DeleteAllTasks`,{
    }).pipe(tap(()=>{
      this.getAllTasks();
    }))
  }
}