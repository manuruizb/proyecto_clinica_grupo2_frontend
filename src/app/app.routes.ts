import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { PatientsComponent } from './pages/patients/patients.component';
import { EmployeesComponent } from './pages/employees/employees.component';
import { MedicalRecordsComponent } from './pages/medical-records/medical-records.component';
import { MedicineInventoryComponent } from './pages/medicine-inventory/medicine-inventory.component';
import { BillingComponent } from './pages/billing/billing.component';
import { AppointmentComponent } from './pages/appointment/appointment.component';

export const routes: Routes = [
    {
        path: '',
        component: LoginComponent
    },
    {
        path: 'pacientes',
        component: PatientsComponent
    },
    {
        path: 'citas',
        component: AppointmentComponent
    },
    {
        path: 'facturas',
        component: BillingComponent
    },
    {
        path: 'inventario-medicamentos',
        component: MedicineInventoryComponent
    },
    {
        path: 'historia-clinica',
        component: MedicalRecordsComponent
    },
    {
        path: 'empleados',
        component: EmployeesComponent
    },
];
