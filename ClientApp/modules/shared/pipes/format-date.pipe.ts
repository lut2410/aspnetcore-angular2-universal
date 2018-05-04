import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'dateFormat',
    pure: false
})
@Injectable()
export class DateFormatPipe implements PipeTransform {
    transform(value: any, args: any): any {
        if (!value) return value;
        if (!isValidDate(value)) return 'invalid date';
        return formatDate(value, args);

        function isValidDate(date) {
            if (typeof date === 'string') {
                return !isNaN(Date.parse(date));
            }

            return Object.prototype.toString.call(date) === '[object Date]';
        }

        function formatDate(date, format) {
            if (typeof date === 'string') {
                date = new Date(Date.parse(date));
            }

            let curr_date = date.getDate();
            let curr_month = date.getMonth() + 1;
            let curr_year = date.getFullYear();
            let result = '';

            if (format === 'dd/MM/yyyy') {
                result = formatDay(curr_date) + '/' + formatDay(curr_month) + '/' + curr_year;
            } else if (format === 'dd/MMM/yyyy') {
                result = formatDay(curr_date) + '/' + formatMonth(curr_month) + '/' + curr_year;
            } else {
                result = formatDay(curr_date) + '-' + formatDay(curr_month) + '-' + curr_year;
            }

            return result;
        }

        function formatDay(day) {
            return (day > 9 ? '' : '0') + day;
        }

        function formatMonth(month) {
            let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            return months[month - 1];
        }
    }
}