import { Pipe, PipeTransform } from '@angular/core';
import { IMultiSelectOption } from './multiSelectOption';

@Pipe({
    name: 'multiSelectSearchFilter'
})
export class MultiSelectSearchFilterPipe implements PipeTransform {
    transform(options: Array<IMultiSelectOption>, args: string): Array<IMultiSelectOption> {
        return options.filter((option: IMultiSelectOption) => option.name.toLowerCase().indexOf((args || '').toLowerCase()) > -1);
    }
}
