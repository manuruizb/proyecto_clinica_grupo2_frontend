import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  standalone: true
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], searchTerm: string): any[] {
    if (!items || !searchTerm) {
      return items; // Si no hay elementos o término de búsqueda, devolver todos los elementos
    }

    const normalizedSearchTerm = searchTerm.toLowerCase(); // Normaliza el término a minúsculas

    return items.filter(item => {
      // Itera sobre cada propiedad del objeto
      return Object.keys(item).some(key => {
        // Verifica si el valor de la propiedad contiene el término de búsqueda
        return item[key].toString().toLowerCase().includes(normalizedSearchTerm);
      });
    });
  }

}
