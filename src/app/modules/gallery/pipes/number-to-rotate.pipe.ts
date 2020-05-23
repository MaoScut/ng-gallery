import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberToRotate'
})
export class NumberToRotatePipe implements PipeTransform {

  transform(value: number): string {
    return `rotate(${value}deg)`;
  }

}
