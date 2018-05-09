import { Injectable } from '@angular/core';

@Injectable()
export class UtilityService {

    constructor() { }

    formatToMachineName(name: string, n: number) {
        return name
            .replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '')     // Remove special character
            .replace(/  +/g, ' ')                                           // Replace double space to single space
            .trim()
            .split(' ')
            .splice(0, n)
            .join(' ')
            .toLowerCase()
            .replace(/ +/g, '-');
    }

    capitalize(text) {
        return text.toLowerCase().replace(/^.|\s\S/g, function (a) { return a.toUpperCase(); });
    };

    uppercaseFirstLetter(text: string) {
        let result = text.split(" ").map(function(item) {
            return item.charAt(0).toUpperCase() + item.substr(1);
        });
        return result.join(" ");
    }

    removeSpecialCharacters(text) {
        var newString = text.replace(/[^\w\s]/gi, '-')
            .split("-").filter(item => item != '').join("-");
        return newString;
    }

    removeNullProperties(obj) {
        for (var propName in obj) { 
          if (obj[propName] === null || obj[propName] === undefined) {
            delete obj[propName];
          } else if (Array.isArray(obj[propName]) && obj[propName].length === 0) {
            delete obj[propName];
          }
        }
        return obj;
    }

    serializeUrl(obj: any): URLSearchParams {
        let params: URLSearchParams = new URLSearchParams();
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                var element = obj[key];
                params.set(key, element);
            }
        }
        return params;
    }
}
