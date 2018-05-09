import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../../../environments';

export class CategoryUrlParamDto {
    id: string;
    urlParam: number;
    name: string;
}

@Injectable()
export class CategoryUrlParamService {

  private baseUrl = environment.jobPortalApiUrl + 'categories/categories-url-params';

  constructor(private http: Http) { }

  getCategoryUrlParams(): Observable<CategoryUrlParamDto[]> {
    return this.http
      .get(this.baseUrl)
      .map((res: Response) => res.json() || []);
  }
}
