import { Component, EventEmitter, Output, output } from '@angular/core';
import { Task } from '../../../core/models/task-model';
import { ResponseDetails } from '../../../core/models/response-details';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../../modules/home/services/task-service.service';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css'
})
export class AddTaskComponent {
  @Output() closePopupEvent = new EventEmitter<void>();
  @Output() addTaskCompleteEvent = new EventEmitter<ResponseDetails>();
  newTask: Task | undefined;
  taskForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('')
  });
  invalidMessage: string | undefined;
  responseDetails: ResponseDetails = { isSuccess: false, message: "" };
  constructor(private taskApi: TaskService) {

  }

  closeAddTaskPopup() {
    this.invalidMessage = "";
    this.taskForm.reset();
    this.closePopupEvent.emit();
  }

  onClickAddTask() {
    if (this.taskForm.invalid) {
      this.invalidMessage = "Add Title";
    }
    else {
      var model = this.taskForm.value;
      this.newTask = new Task();
      this.newTask.Title = model.title!;
      this.newTask.Description = model.description!;
      this.taskApi.addTask(this.newTask).subscribe({
        next: t => {
          this.responseDetails.isSuccess = true,
            this.responseDetails.message = "Task added successfully",
            this.closePopupEvent.emit();
            this.addTaskCompleteEvent.emit(this.responseDetails);
        },
        error: (errorResponse: any) => {
          this.responseDetails.isSuccess = false,
            this.responseDetails.message = "Adding task failes";
        },
        complete: () => console.info('complete')
      })
      this.taskForm.reset();
    }
  }
}