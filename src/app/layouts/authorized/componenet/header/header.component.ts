import { Component, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
 @Input() name='';
 signOutSuccessEvent=new EventEmitter<void>();

 constructor(private router:Router){

 }

 onClickSignOut(){  
  localStorage.clear();
  this.router.navigate(["/login"]);
 }
}
