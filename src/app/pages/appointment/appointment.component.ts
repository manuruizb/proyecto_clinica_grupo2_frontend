import { Component, inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { SideBarComponent } from '../../components/side-bar/side-bar.component';
import { DatatableComponent, DatatableDataValues } from '../../components/datatable/datatable.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { Appointment } from '../../models/appointment-model';
import { AppointmentService } from '../../services/appointment.service';
import { firstValueFrom } from 'rxjs';
import { AppointmentViewComponent } from '../../components/appointment/appointment-view/appointment-view.component';
import { AppointmentFormComponent } from '../../components/appointment/appointment-form/appointment-form.component';
import Dialogtype, { Dialog } from '../../libs/dialog.lib';

@Component({
  selector: 'app-appointment',
  standalone: true,
  imports: [
    SideBarComponent,
    DatatableComponent,
    TooltipModule
  ],
  templateUrl: './appointment.component.html',
  styleUrl: './appointment.component.scss'
})
export class AppointmentComponent implements OnInit {

  @ViewChild('actionsTemplate', { static: true }) actionsTemplate: TemplateRef<any> = {} as TemplateRef<any>;
  private offcanvasService = inject(NgbOffcanvas);

  JSONdata: Appointment[] = [];
  dataValues: Array<DatatableDataValues> = [];

  itemsPerPage: number = 5;
  totalItems: number = 0;
  currentPage: number = 1;


  constructor(private appointmentService: AppointmentService) { }


  async ngOnInit() {
    this.initializeDatatable();
    await this.getList();
  }

  initializeDatatable() {
    this.dataValues = [
      { id: 'patientName', header: 'Paciente' },
      { id: 'employeeName', header: 'Profesional' },
      { id: 'datetime', header: 'Fecha', date: true},
      { id: 'datetime', header: 'Hora', hour: true},
      { id: 'status', header: 'Estado' },
      { header: '', template: this.actionsTemplate }
    ];
  }


  async getList() {

    const data = await firstValueFrom(this.appointmentService.getList());
    this.JSONdata = data.map((item) => {
      return {
        ...item, 
        patientName: item.patient.firstName + ' ' + item.patient.lastName,
        employeeName: item.employee.firstName + ' ' + item.employee.lastName,
      }
    });
    this.totalItems = this.JSONdata.length;
  }

  onDelete(id: number) {
    Dialog.show('¿Estás seguro que deseas eliminar este registro?', Dialogtype.question).subscribe(yes => {
      if (yes) {
        this.appointmentService.delete(id).subscribe(() =>{
          Dialog.show('Registro eliminado correctamente', Dialogtype.success);
          this.getList();
        });
      }
    });
  }

  viewDetails(data: any) {
		const modalRef = this.offcanvasService.open(AppointmentViewComponent, { position: 'end' });
    modalRef.componentInstance.data = data;
	}

  openModal(isEditable: boolean, id?: number, data?: any) {
		const modalRef = this.offcanvasService.open(AppointmentFormComponent, { position: 'end' });
    modalRef.componentInstance.isEditable = isEditable;
    modalRef.componentInstance.id = id;
    modalRef.componentInstance.data = data;

    modalRef.result.then(() => {
      this.getList();
    }).catch(() => {
      this.getList();
    });
	}


}
