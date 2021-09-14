import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlight'
})
export class HighlightPipe implements PipeTransform {

  transform(productName: any, searchValue: any): any {
    if (!searchValue) {return productName;}
    var re = new RegExp(searchValue, 'gi'); 
    return productName.replace(re, "<mark>$&</mark>");
  }

}
