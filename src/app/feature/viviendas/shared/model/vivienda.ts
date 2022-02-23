import { Archivo } from '../../../archivo/shared/model/archivo';
export class Vivienda {
    id?: number;
    tipoVivienda: number;
    costoDiario: number;
    aireAcondicionado: number;
    admiteMascotas: number;
    calefaccion: number;
    numeroHabitaciones: number;
    numeroBanios: number;
    numeroPersonas: number;
    ciudad: string;
    departamento: string;
    archivos: Archivo[] = [];

}
