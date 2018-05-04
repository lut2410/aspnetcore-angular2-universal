import { Pipe, PipeTransform } from '@angular/core';
import { UtilityService } from '../services/utility.service';


@Pipe({
    name: 'convertToMachineName'
})
export class ConvertToMachineNamePipe implements PipeTransform {

    constructor(private utilityService: UtilityService) {}

    transform(value: string, wordsNum: number): string {
        return this.utilityService.formatToMachineName(value, wordsNum);
    }

}
