import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { BsDatepickerConfig, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { PatientsService } from '../../../services/patients.service';
import Dialogtype, { Dialog } from '../../../libs/dialog.lib';
import { firstValueFrom } from 'rxjs';
import { Helpers } from '../../../libs/helpers';

@Component({
  selector: 'app-patients-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BsDatepickerModule,
  ],
  templateUrl: './patients-form.component.html',
  styleUrl: './patients-form.component.scss'
})
export class PatientsFormComponent implements OnInit {

  activeOffcanvas = inject(NgbActiveOffcanvas);
  @Input() isEditable: boolean = false;
  @Input() id: number | any;
  @Input() data: any;
  helpers = Helpers;


  bsConfig?: Partial<BsDatepickerConfig>;

  customForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', Validators.required),
    birthDate: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
    emergency_contact: new FormControl('', Validators.required),
    emergency_contact_phone: new FormControl('', Validators.required),
    insurance_entity: new FormControl('', Validators.required),
    policy_number: new FormControl('', Validators.required)
  });


  constructor(private patientsService: PatientsService) {
    this.bsConfig = Object.assign({}, { maxDate: new Date(), dateInputFormat: 'YYYY-MM-DD' });
  }


  ngOnInit(): void {
    if (this.isEditable) {
      this.customForm.patchValue({
        firstName: this.data.firstName,
        lastName: this.data.lastName,
        email: this.data.email,
        phone: this.data.phone,
        birthDate: this.data.birthDate,
        address: this.data.address,
        gender: this.data.gender,
        emergency_contact: this.data.emergency_contact,
        emergency_contact_phone: this.data.emergency_contact_phone,
        insurance_entity: this.data.insurance_entity,
        policy_number: this.data.policy_number,
      });
    }
  }


  async onSave() {
    if (this.customForm.invalid) {
      Dialog.show('Debes ingresar los campos obligatorios', Dialogtype.warning);
      return;
    }

    const obj = this.customForm.getRawValue();

    if (typeof obj.birthDate === 'object') {
      obj.birthDate = obj.birthDate.toISOString().split('T')[0];
    }

    if (this.isEditable) {
      await firstValueFrom(this.patientsService.update(obj, this.id));
    } else {

      await firstValueFrom(this.patientsService.create(obj));
    }

    Dialog.show('Operación realizada exitosamente.', Dialogtype.success);

    this.activeOffcanvas.dismiss('Closed');
  }

}
