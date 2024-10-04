import { Employees } from "./employees-model";

export interface ResponseToken extends Employees{ 
    refresh: string;
    access: string;
}