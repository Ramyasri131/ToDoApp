import { Component, EventEmitter, Output, output } from '@angular/core';
import { NavigationComponent } from '../navigation/navigation.component';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [NavigationComponent,RouterModule],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent {
  @Output() onClickAddTask=new EventEmitter<void>();
  isBlur:boolean=false;  

  constructor(private router:Router){

  }

  displayPopup(){
    this.onClickAddTask.emit();
  }
}