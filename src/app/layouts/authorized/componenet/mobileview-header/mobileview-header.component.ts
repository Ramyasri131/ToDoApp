import { Component, EventEmitter, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NavigationComponent } from '../side-bar/navigation/navigation.component';


@Component({
    selector: 'app-mobileview-header',
    standalone: true,
    templateUrl: './mobileview-header.component.html',
    styleUrl: './mobileview-header.component.css',
    imports: [NavigationComponent, RouterModule,]
})
export class MobileviewHeaderComponent {
  @Output() onClickAddTask=new EventEmitter<void>();

  constructor(private router:Router){

  }

  navigateTo(event: Event){
    const value=(event.target as HTMLSelectElement).value;
      this.router.navigate([value]);

  }

  displayPopup(){
    this.onClickAddTask.emit();
  }

  onClickSignOut(){
    localStorage.clear();
    this.router.navigate(['/login']);
   }
}