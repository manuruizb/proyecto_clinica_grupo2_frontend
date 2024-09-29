import { Component, inject, Input } from '@angular/core';
import { Employees } from '../../../models/employees-model';
import { NgbActiveOffcanvas, NgbOffcanvasRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-employees-view',
  standalone: true,
  imports: [],
  templateUrl: './employees-view.component.html',
  styleUrl: './employees-view.component.scss'
})
export class EmployeesViewComponent {

  activeOffcanvas = inject(NgbActiveOffcanvas);
  @Input() data: any;


}
