import { Injectable } from '@angular/core';
import { Response, Http } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/toPromise';

import { environment } from '../../../../environments';
import { ICompany, Company } from '../../dto/company/company.dto';

const apiHost = environment.jobPortalApiUrl;

@Injectable()

export class CompanyService {
    private requestUrlPrefix: string = 'companies/';
    private position: any;
    private jobListData: any;
    private isBackFromJobDetail: boolean;

    constructor(private _http: Http) { }

    getCompanyDetails(params): Observable<any> {

        const requestUrl = apiHost + this.requestUrlPrefix + params + '/microsite-info';
        return this._http.get(requestUrl)
            .map((response: Response) => {
                const data = response.json();
                const companyData = {
                    companyDetails: data.companyDetails,
                    jobs: data.publishedJobs
                };
                return companyData;
            })
            .catch((error: any) => Observable.throw(error.json().errorMessage || 'ERROR_LIST.NOT_JOB_LIST'));
    }


    getCompanyList(params): Observable<Company[]> {

        const requestUrl = apiHost + this.requestUrlPrefix + 'search';
        return this._http.post(requestUrl, params)
            .map((response: Response) => <Company[]>response.json())
            .catch((error: any) => Observable.throw(error.json().errorMessage || 'ERROR_LIST.NOT_JOB_LIST'));
    }


    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}

