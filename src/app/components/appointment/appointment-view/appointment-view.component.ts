import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { NgbActiveOffcanvas } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-appointment-view',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './appointment-view.component.html',
  styleUrl: './appointment-view.component.scss'
})
export class AppointmentViewComponent {

  activeOffcanvas = inject(NgbActiveOffcanvas);
  @Input() data: any;

}
