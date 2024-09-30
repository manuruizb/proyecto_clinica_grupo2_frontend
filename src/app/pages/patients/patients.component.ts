import { Component, inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { SideBarComponent } from '../../components/side-bar/side-bar.component';
import { DatatableComponent, DatatableDataValues } from '../../components/datatable/datatable.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { Patients } from '../../models/patients-model';
import { PatientsService } from '../../services/patients.service';
import { firstValueFrom } from 'rxjs';
import { PatientsViewComponent } from '../../components/patients/patients-view/patients-view.component';
import { PatientsFormComponent } from '../../components/patients/patients-form/patients-form.component';
import Dialogtype, { Dialog } from '../../libs/dialog.lib';

@Component({
  selector: 'app-patients',
  standalone: true,
  imports: [
    SideBarComponent,
    DatatableComponent,
    TooltipModule
  ],
  templateUrl: './patients.component.html',
  styleUrl: './patients.component.scss'
})
export class PatientsComponent implements OnInit {

  @ViewChild('actionsTemplate', { static: true }) actionsTemplate: TemplateRef<any> = {} as TemplateRef<any>;
  private offcanvasService = inject(NgbOffcanvas);

  JSONdata: Patients[] = [];
  dataValues: Array<DatatableDataValues> = [];

  itemsPerPage: number = 5;
  totalItems: number = 0;
  currentPage: number = 1;

  constructor(private patientService: PatientsService) {}

  async ngOnInit(): Promise<void> {
    this.initializeDatatable();
    await this.getList();
  }

  initializeDatatable() {
    this.dataValues = [
      { id: 'firstName', header: 'Nombre'},
      { id: 'lastName', header: 'Apellido'},
      { id: 'phone', header: 'Teléfono' },
      { id: 'insurance_entity', header: 'Aseguradora' },
      { header: '', template: this.actionsTemplate }
    ];
  }

  async getList(){
    this.JSONdata = await firstValueFrom(this.patientService.getList());
    this.totalItems = this.JSONdata.length;
  }

  onDelete(id: number) {
    Dialog.show('¿Estás seguro que deseas eliminar este registro?', Dialogtype.question).subscribe(yes => {
      if (yes) {
        this.patientService.delete(id).subscribe(() =>{
          Dialog.show('Registro eliminado correctamente', Dialogtype.success);
          this.getList();
        });
      }
    });
  }

  viewDetails(data: any) {
		const modalRef = this.offcanvasService.open(PatientsViewComponent, { position: 'end' });
    modalRef.componentInstance.data = data;
	}

  openModal(isEditable: boolean, id?: number, data?: any){
    const modalRef = this.offcanvasService.open(PatientsFormComponent, { position: 'end' });
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
