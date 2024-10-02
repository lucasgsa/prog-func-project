import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BranchComponent } from './branch/branch.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    BranchComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'projeto-funcional-branchs';
}
