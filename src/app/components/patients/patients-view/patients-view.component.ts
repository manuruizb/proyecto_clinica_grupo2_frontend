import { Component, inject, Input } from '@angular/core';
import { NgbActiveOffcanvas } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-patients-view',
  standalone: true,
  imports: [],
  templateUrl: './patients-view.component.html',
  styleUrl: './patients-view.component.scss'
})
export class PatientsViewComponent {

  activeOffcanvas = inject(NgbActiveOffcanvas);
  @Input() data: any;

}
