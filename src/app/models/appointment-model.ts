import { Employees } from "./employees-model";
import { Patients } from "./patients-model";

export interface Appointment{
    id: number;
    idPatient: number;
    idEmployee: number;
    datetime: Date;
    reason: string;
    status: string;
    patient: Patients;
    employee: Employees;

    patientName: string;
    employeeName: string;
}