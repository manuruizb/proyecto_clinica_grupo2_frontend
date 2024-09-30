import { Component, inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { SideBarComponent } from '../../components/side-bar/side-bar.component';
import { DatatableComponent, DatatableDataValues } from '../../components/datatable/datatable.component';
import { Employees } from '../../models/employees-model';
import { EmployeesService } from '../../services/employees.service';
import { firstValueFrom } from 'rxjs';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import Dialogtype, { Dialog } from '../../libs/dialog.lib';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { EmployeesViewComponent } from '../../components/employees/employees-view/employees-view.component';
import { EmployeesFormComponent } from '../../components/employees/employees-form/employees-form.component';


@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [
    SideBarComponent,
    DatatableComponent,
    TooltipModule
  ],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss'
})
export class EmployeesComponent implements OnInit {

  @ViewChild('actionsTemplate', { static: true }) actionsTemplate: TemplateRef<any> = {} as TemplateRef<any>;
  private offcanvasService = inject(NgbOffcanvas);

  JSONdata: Employees[] = [];
  dataValues: Array<DatatableDataValues> = [];

  itemsPerPage: number = 5;
  totalItems: number = 0;
  currentPage: number = 1;

  constructor(private employeeService: EmployeesService) { }

  async ngOnInit(): Promise<void> {
    this.initializeDatatable();
    await this.getList();
  }

  initializeDatatable() {
    this.dataValues = [
      { id: 'firstName', header: 'Nombre' },
      { id: 'lastName', header: 'Apellido' },
      { id: 'phone', header: 'Teléfono' },
      { id: 'rol', header: 'Rol' },
      { header: '', template: this.actionsTemplate }
    ];
  }

  async getList() {

    this.JSONdata = await firstValueFrom(this.employeeService.getList());
    this.totalItems = this.JSONdata.length;
  }



  onDelete(id: number) {
    Dialog.show('¿Estás seguro que deseas eliminar este registro?', Dialogtype.question).subscribe(yes => {
      if (yes) {
        this.employeeService.delete(id).subscribe(() =>{
          Dialog.show('Registro eliminado correctamente', Dialogtype.success);
          this.getList();
        });
      }
    });
  }

  viewDetails(data: any) {
		const modalRef = this.offcanvasService.open(EmployeesViewComponent, { position: 'end' });
    modalRef.componentInstance.data = data;
	}

  openModal(isEditable: boolean, id?: number, data?: any) {
		const modalRef = this.offcanvasService.open(EmployeesFormComponent, { position: 'end' });
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
