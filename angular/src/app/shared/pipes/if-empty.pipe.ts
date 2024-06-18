import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ifEmpty'
})
export class IfEmptyPipe implements PipeTransform {

  transform(value: any, defaultValue: any): any {
    if(value) {
      if(typeof value !== 'number') {
        value = value.trim();
      }
    }
    if(typeof value === 'undefined' || value == null || value == '' || value === '0000-00-00 00:00:00' || value === '0000-00-00') {
      return defaultValue;
    }
    return value;
  }

}
