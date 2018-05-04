import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { BannerAdsDto } from '../../dto/banner-ads/banner-ads.dto';
import { environment } from "../../../../environments";

const apiHost = environment.jobPortalApiUrl;

@Injectable()

export class BannerAdsService {
    private bannerAdsList: any;
    private requestUrlPrefix: string = 'bannerads/';
    constructor(private _http: Http) {
    }
    getBannerAds(): Observable<BannerAdsDto[]>{
        const requestUrl = apiHost + this.requestUrlPrefix + 'banner-ads';
        return this._http.get(requestUrl)
                    .map((response: Response) => <BannerAdsDto[]>response.json())
                    .catch((error: any)=> Observable.throw(error.json().errorMessage) || 'ERROR_LIST.NOT_BANNER_ADS')
    }
}