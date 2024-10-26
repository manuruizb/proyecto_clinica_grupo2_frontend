import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { NgbActiveOffcanvas } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-medical-records-view',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './medical-records-view.component.html',
  styleUrl: './medical-records-view.component.scss'
})
export class MedicalRecordsViewComponent {

  activeOffcanvas = inject(NgbActiveOffcanvas);
  @Input() data: any;

}
