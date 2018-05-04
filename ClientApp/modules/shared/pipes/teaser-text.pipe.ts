import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'teaserText'
})
export class TeaserTextPipe implements PipeTransform {
    result: string = '';

    transform(value: string, charNum: number, threeDots: boolean, readMore: string): string {
        if (value.length < charNum) return value;

        if (value !== '') this.result += value.substring(0, charNum);
        if (threeDots) this.result += '<span class="three-dots"> ... </span>';
        if (readMore !== '') this.result += '<div class="read-more">' + readMore + ' </div>';
        return this.result;
    }

}
