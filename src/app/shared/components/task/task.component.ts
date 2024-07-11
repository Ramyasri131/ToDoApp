import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent implements OnInit {
  @Input() title = '';
  @Input() taskStatus = '';
  @Output() updateStatusEvent = new EventEmitter<string>();
  isActive: boolean = false;

  ngOnInit(): void {
    if (this.taskStatus == 'Active') {
      this.isActive = true;
    }
    else {
      this.isActive = false;
    }
  }

  markAsComplete(event:Event ) :void{
    event.stopPropagation();
    if(this.taskStatus=='Active')
    {
      this.isActive=false;
    this.updateStatusEvent.emit('InActive');
    }
    else{
      this.isActive=true;
      this.updateStatusEvent.emit('Active');
    }
  }
}