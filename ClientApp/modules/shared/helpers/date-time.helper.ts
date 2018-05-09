export default class DateTimeHelper {
    public static calculateDurationFromDateTime(fromDateTime: Date, toDateTime: Date = new Date()): string {
        const compareInThePast = toDateTime.getTime() < fromDateTime.getTime();
        const seconds = Math.abs(toDateTime.getTime() - fromDateTime.getTime());
        const minutes = Math.floor((seconds) / (60000));
        const hours = Math.floor((seconds) / (60000 * 60));
        const days = Math.floor((seconds) / (60000 * 60 * 24));
        const months = Math.floor((seconds) / (60000 * 60 * 24 * 30));
        const years = Math.floor((seconds) / (60000 * 60 * 24 * 365));
        return compareInThePast ? this.getTextForCompareDateInThePast(years, months, days, hours, minutes, seconds) :
            this.getTextForCompareDateInTheFuture(years, months, days, hours, minutes, seconds);
    }

    private static getTextForCompareDateInThePast(years: number, months: number,
        days: number, hours: number, minutes: number, seconds: number): string {
        if (years > 1) {
            return years.toString() + ' years ago';
        }
        if (years === 1) {
            return '1 year ago';
        }
        if (months > 1) {
            return months.toString() + ' months ago';
        }
        if (months === 1) {
            return '1 month ago';
        }
        if (days > 1) {
            return days.toString() + ' days ago';
        }
        if (days === 1) {
            return '1 day ago';
        }
        if (hours > 1) {
            return hours.toString() + ' hours ago';
        }
        if (hours === 1) {
            return ' 1 hours ago';
        }
        if (minutes > 1) {
            return minutes.toString() + ' minutes ago';
        }
        if (minutes === 1) {
            return '1 minute ago';
        }
        return 'just now';
    }

    private static getTextForCompareDateInTheFuture(years: number, months: number, days: number,
        hours: number, minutes: number, seconds: number): string {
        if (years > 1) {
            return 'in ' + years.toString() + ' years';
        }
        if (years === 1) {
            return 'in 1 year';
        }
        if (months > 1) {
            return 'in ' + months.toString() + ' months';
        }
        if (months === 1) {
            return 'in 1 month';
        }
        if (days > 1) {
            return 'in ' + days.toString() + ' days';
        }
        if (days === 1) {
            return 'in 1 day';
        }
        if (hours > 1) {
            return 'in ' + hours.toString() + ' hours';
        }
        if (hours === 1) {
            return 'in 1 hour';
        }
        if (minutes > 1) {
            return 'in ' + minutes.toString() + ' minutes';
        }
        if (minutes === 1) {
            return 'in 1 minute';
        }
        return 'just now';
    }
}
