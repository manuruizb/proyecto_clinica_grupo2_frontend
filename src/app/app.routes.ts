import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { PatientsComponent } from './pages/patients/patients.component';
import { EmployeesComponent } from './pages/employees/employees.component';
import { MedicalRecordsComponent } from './pages/medical-records/medical-records.component';
import { MedicineInventoryComponent } from './pages/medicine-inventory/medicine-inventory.component';
import { BillingComponent } from './pages/billing/billing.component';
import { AppointmentComponent } from './pages/appointment/appointment.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        component: LoginComponent
    },
    {
        path: 'pacientes',
        component: PatientsComponent,
        canActivate: [authGuard]
    },
    {
        path: 'citas',
        component: AppointmentComponent,
        canActivate: [authGuard]
    },
    {
        path: 'facturas',
        component: BillingComponent,
        canActivate: [authGuard]
    },
    {
        path: 'inventario-medicamentos',
        component: MedicineInventoryComponent,
        canActivate: [authGuard]
    },
    {
        path: 'historia-clinica',
        component: MedicalRecordsComponent,
        canActivate: [authGuard]
    },
    {
        path: 'empleados',
        component: EmployeesComponent,
        canActivate: [authGuard]
    },
];
