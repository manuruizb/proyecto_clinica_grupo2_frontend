import { Component, OnInit } from '@angular/core';
import { SideBarComponent } from '../../components/side-bar/side-bar.component';
import { DatatableComponent, DatatableDataValues } from '../../components/datatable/datatable.component';

@Component({
  selector: 'app-patients',
  standalone: true,
  imports: [
    SideBarComponent,
    DatatableComponent
  ],
  templateUrl: './patients.component.html',
  styleUrl: './patients.component.scss'
})
export class PatientsComponent implements OnInit {

  JSONdata: any[] = [];
  dataValues: Array<DatatableDataValues> = [];

  itemsPerPage: number = 5;
  totalItems: number = 0;
  currentPage: number = 1;

  constructor() {}

  ngOnInit(): void {
    this.initializeDatatable();
  }

  initializeDatatable() {
    this.dataValues = [
      { id: 'firstName', header: 'Nombre', date: true },
      { id: 'lastName', header: 'Apellido', date: true },
      { id: 'phone', header: 'Teléfono' },
      { id: 'insurance_entity', header: 'Aseguradora' },
      // { header: '', template: this.actionsTemplate }
    ];
  }

  async getAll(page: number, searchParameter?: string) {}

  onPageChanged(page: number) {
    this.getAll(page);
  }
}
