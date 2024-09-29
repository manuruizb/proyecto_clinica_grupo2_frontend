import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PatientsComponent } from './components/patients/patients.component';

export const routes: Routes = [
    {
        path: '',
        component: LoginComponent
    },
    {
        path: 'pacientes',
        component: PatientsComponent
    }
];
