import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { BsDatepickerConfig, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { Helpers } from '../../../libs/helpers';
import { AppointmentService } from '../../../services/appointment.service';
import { EmployeesService } from '../../../services/employees.service';
import { PatientsService } from '../../../services/patients.service';
import { firstValueFrom } from 'rxjs';
import { Employees } from '../../../models/employees-model';
import { Patients } from '../../../models/patients-model';

@Component({
  selector: 'app-appointment-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BsDatepickerModule,
  ],
  templateUrl: './appointment-form.component.html',
  styleUrl: './appointment-form.component.scss'
})
export class AppointmentFormComponent implements OnInit {

  activeOffcanvas = inject(NgbActiveOffcanvas);
  @Input() isEditable: boolean = false;
  @Input() id: number | any;
  @Input() data: any;
  helpers = Helpers;

  employeeList: Employees[] = [];
  patientList: Patients[] = [];

  bsConfig?: Partial<BsDatepickerConfig>;

  customForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    idPatient: new FormControl('', Validators.required),
    idEmployee: new FormControl('', Validators.required),
    datetime: new FormControl('', [Validators.required, Validators.email]),
    reason: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required)
  });

  constructor(private appointmentService: AppointmentService, private employeeService: EmployeesService, private patientsService: PatientsService) {
    this.bsConfig = Object.assign({}, { minDate: new Date(), dateInputFormat: 'YYYY-MM-DD' });
  }

  async ngOnInit(): Promise<void> {
    if (this.isEditable) {
  
      this.customForm.patchValue({
        idPatient: this.data.idPatient,
        idEmployee: this.data.idEmployee,
        datetime: this.data.datetime,
        reason: this.data.reason,
        status: this.data.status,
      });
    }


    await this.getEmployees();
    await this.getPatients();
  }


  async getEmployees() {
    this.employeeList = await firstValueFrom(this.employeeService.getList());
  }

  async getPatients() {
    this.patientList = await firstValueFrom(this.patientsService.getList());
  }


  async onSave() {
    
  }
}
