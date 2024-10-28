import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { BsDatepickerConfig, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { Helpers } from '../../../libs/helpers';
import { MedicalRecords } from '../../../models/medical-records-model';
import { BillingService } from '../../../services/billing.service';
import { EmployeesService } from '../../../services/employees.service';
import { MedicalRecordsService } from '../../../services/medical-records.service';
import { firstValueFrom } from 'rxjs';
import Dialogtype, { Dialog } from '../../../libs/dialog.lib';
import { Patients } from '../../../models/patients-model';
import { PatientsService } from '../../../services/patients.service';
import { MedicalRMedicineIService } from '../../../services/medical-r-medicine-i.service';

@Component({
  selector: 'app-billing-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BsDatepickerModule,
    TimepickerModule
  ],
  templateUrl: './billing-form.component.html',
  styleUrl: './billing-form.component.scss'
})
export class BillingFormComponent implements OnInit {

  activeOffcanvas = inject(NgbActiveOffcanvas);
  @Input() isEditable: boolean = false;
  @Input() id: number | any;
  @Input() data: any;
  helpers = Helpers;

  patientList: Patients[] = [];
  medicalRecordsList: MedicalRecords[] = [];

  bsConfig?: Partial<BsDatepickerConfig>;

  customForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    idPatients: new FormControl('', Validators.required),
    idMedicalRecords: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    totalAmount: new FormControl('', Validators.required),
    details: new FormControl('', Validators.required),
    paymentStatus: new FormControl('', Validators.required)
  });

  constructor(
    private billingService: BillingService,
    private patientsService: PatientsService,
    private medicalRecordsService: MedicalRecordsService,
  private medicalRMedicineIService: MedicalRMedicineIService) {
    this.bsConfig = Object.assign({}, { minDate: new Date(), dateInputFormat: 'YYYY-MM-DD' });
  }

  async ngOnInit(): Promise<void> {
    if (this.isEditable) {

      console.log(this.data)

      this.customForm.patchValue({
        idPatients: this.data.idPatients,
        idMedicalRecords: this.data.idMedicalRecords,
        date: this.data.date,
        totalAmount: this.data.totalAmount,
        details: this.data.details,
        paymentStatus: this.data.paymentStatus,
      });
    }


    await this.getPatients();
  }

  async getPatients() {
    this.patientList = await firstValueFrom(this.patientsService.getList());
  }

  async getMedicalRecords(evt: Event) {

    let element = evt.target as HTMLSelectElement;

    if (element.value !== '') {
      this.medicalRecordsList = await firstValueFrom(this.medicalRecordsService.getListByPatientId(parseInt(element.value)));
    } else {
      this.medicalRecordsList = [];
    }

  }

  async getMedicine(evt: Event) {
    let element = evt.target as HTMLSelectElement;

    if(element.value !== ''){
      const medicineList = await firstValueFrom(this.medicalRMedicineIService.getListByIdMedicalRecords(parseInt(element.value)));
      
    
    }else{
      
    }
   

  }

  async onSave() {
    if (this.customForm.invalid) {
      Dialog.show('Debes ingresar los campos obligatorios', Dialogtype.warning);
      return;
    }

    const obj = this.customForm.getRawValue();
    // Añadi para asegurar que lo que llega al from es de tipo fecha
    let date = this.customForm.get('datetime')?.value as Date;
    let hour = this.customForm.get('time')?.value as Date;

    if (!(date instanceof Date)) {
      date = new Date(date);  // Convierte la fecha si es necesario
    }

    if (!(hour instanceof Date)) {
      hour = new Date(hour);  // Convierte la hora si es necesario
    }

    if (isNaN(date.getTime()) || isNaN(hour.getTime())) {
      Dialog.show('Fecha u hora inválida.', Dialogtype.warning);
      return;
    }

    const dateToSave = new Date(
      date.getFullYear(), // Año de `date`
      date.getMonth(),    // Mes de `date` (0-11)
      date.getDate(),     // Día de `date`
      hour.getHours(),    // Hora de `hour`
      hour.getMinutes(),  // Minutos de `hour`
      hour.getSeconds()   // Segundos de `hour`
    );

    obj.datetime = dateToSave;

    if (this.isEditable) {
      await firstValueFrom(this.billingService.update(obj, this.id));
    } else {

      await firstValueFrom(this.billingService.create(obj));
    }

    Dialog.show('Operación realizada exitosamente.', Dialogtype.success);

    this.activeOffcanvas.dismiss('Closed');
  }


}
