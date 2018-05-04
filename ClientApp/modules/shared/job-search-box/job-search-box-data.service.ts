import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { environment } from '../../../environments';
import { CacheDataService } from '../../core/cache-data.service';

@Injectable()

export class JobSearchBoxDataService {
    private apiJobCountUrl: string = environment.jobPortalApiUrl + 'jobs/count';
    private jobsNum: Observable<any>;

    constructor(private _http: Http, private cacheDataService: CacheDataService) { }

    getNumberOfJobs(): Observable<any> {
        return this._http.get(this.apiJobCountUrl)
            .map(res => {
                this.cacheDataService.setCache('jobsNum', res.json());
                return res.json();
            })
            .catch((response: Response) => {
                if (response.status) {
                    return Observable.throw(response.json().errorMessage || 'ERROR_LIST.NOT_JOB_COUNT');
                } else {
                    return Observable.of(0);
                }
            });
    }
}
