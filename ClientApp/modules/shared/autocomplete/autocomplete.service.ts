import { Injectable, Optional } from '@angular/core';
import { Http, Headers, Response, URLSearchParams, RequestOptions } from '@angular/http';

@Injectable()
export class AutocompleteService {

    public url: string = "";
    private headers: Headers;

    constructor(private _http: Http) {
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');
    }

    getAutocomplete(searchString: string, beforeSend?: (result?: any) => void, onSuccess?: (result?: any) => void, onFail?: (error?: any) => void): void {
        let self = this;
        beforeSend();
       
        self._http.get(this.url, {
                params: {
                    query: encodeURIComponent(searchString)
                }
            })
            .subscribe((result: Response) => {
                if (onSuccess) onSuccess(result.json());
            }, error => {
                if (onFail) onFail(error);
            });
    }

    setUrl(value: string) {
        this.url = value;
    }

}
