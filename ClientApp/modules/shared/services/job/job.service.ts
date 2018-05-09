import { Injectable } from '@angular/core';
import { Response, Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import { AuthHttp } from 'angular2-jwt';

import { environment } from '../../../../environments';
import { Job } from '../../dto/job/job.dto';
import { SecurityService } from '../security.service';

const apiUrl = `${environment.jobPortalApiUrl}jobs/`;

@Injectable()
export class JobService {
    private position: any;
    private jobListData: any;
    private isBackFromJobDetail: boolean;

    constructor(private http: Http,
        private authHttp: AuthHttp,
        private securityService: SecurityService) { }

    getJobList(params): Observable<Job[]> {
        const requestUrl = apiUrl + 'search';
        return this.http.post(requestUrl, params)
            .map((response: Response) => <Job[]>response.json())
            .catch((error: any) => Observable.throw(error.json().errorMessage || 'ERROR_LIST.NOT_JOB_LIST'));
    }

    getJob(id: string): Promise<Job> {
        const requestUrl = apiUrl + id;
        return this.http.get(requestUrl)
            .toPromise()
            .then(response => response.json() as Job)
            .catch(this.handleError);
    }

    getFavoriteJobList(): Observable<Job[]> {
        const self = this;

        const requestUrl = `${environment.jobPortalApiUrl}favoritejobs/`;
        return self.authHttp.get(requestUrl)
            .map((response: Response) => <Job[]>response.json())
            .catch((error: any) => {
                if (error.status === 401) {
                    self.securityService.storePreviousUrlBeforeLogging();
                    self.securityService.login();
                }
                return Observable.throw(error.json().errorMessage || 'ERROR_LIST.NOT_FAVORITE_JOB_LIST');
            });
    }

    addOrDeleteFavoriteJob(jobId): Observable<any> {
        const self = this;

        const requestUrl = `${environment.jobPortalApiUrl}favoritejobs/`;
        return self.authHttp.post(requestUrl, { jobId: jobId })
            .catch((error: any) => {
                if (error.status === 401) {
                    self.securityService.storePreviousUrlBeforeLogging();
                    self.securityService.login();
                }
                return Observable.throw(error.json().errorMessage || 'ERROR_LIST.NOT_TOOGLE_FAVORITE_JOB');
            });
    }

    setJobPosition(position: any) {
        this.position = position;
    }

    setJobListData(data: any) {
        this.jobListData = data;
    }

    getJobListData() {
        return this.jobListData;
    }

    setStatusBackFromJobDetail(status: boolean) {
        this.isBackFromJobDetail = status;
    }

    getStatusBackFromJobDetail() {
        return this.isBackFromJobDetail;
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}

