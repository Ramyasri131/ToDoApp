import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-navigation-heading',
  standalone: true,
  imports: [],
  templateUrl: './header-title.component.html',
  styleUrl: './header-title.component.css'
})

export class HeaderTitleComponent {
 @Input() name='';
 
}
