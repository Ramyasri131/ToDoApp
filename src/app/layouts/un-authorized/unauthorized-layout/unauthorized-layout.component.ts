import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-unauthorized-layout',
  standalone: true,
  imports: [RouterOutlet,RouterModule],
  templateUrl: './unauthorized-layout.component.html',
  styleUrl: './unauthorized-layout.component.css'
})
export class UnauthorizedLayoutComponent {

}
