import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(items: any, searchFilter:string): any {
    if(!items || !searchFilter){
      return items;
    }
      return items.filter(item => item.name.toLowerCase().indexOf(searchFilter.toLowerCase()) !== -1 );
  }

}
