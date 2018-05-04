import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../../environments';

export class CategoryDto {
  name: string;
  count: number;
  items: [CategoryDto];
}

@Injectable()
export class CategoryFilterDataService {

  private baseUrl = environment.jobPortalApiUrl + 'categories';

  constructor(private http: Http) { }

  getCategories(): Observable<CategoryDto[]> {
    return this.http
      .get(this.baseUrl)
      .map((res: Response) => res.json() || []);
  }
}
