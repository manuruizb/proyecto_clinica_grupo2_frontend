import { Component } from '@angular/core';
import { SideBarComponent } from '../side-bar/side-bar.component';

@Component({
  selector: 'app-patients',
  standalone: true,
  imports: [
    SideBarComponent
  ],
  templateUrl: './patients.component.html',
  styleUrl: './patients.component.scss'
})
export class PatientsComponent {

}
