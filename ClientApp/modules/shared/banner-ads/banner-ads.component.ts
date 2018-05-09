import { Component, OnInit, Input } from '@angular/core';
import { BannerAdsDto } from '../dto/banner-ads/banner-ads.dto';
import { BannerAdsService } from '../services/banner-ads/banner-ads.service';
import { TranslateService } from '@ngx-translate/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
    selector: 'app-banner-ads',
    templateUrl: './banner-ads.component.html'
})
export class BannerAdsComponent implements OnInit {
    public bannerAds: BannerAdsDto[] = [];
     @Input() bannerAdsInfo: any;
    constructor(
        private bannerAdsService: BannerAdsService,
        public translate: TranslateService,
        public toastr: ToastsManager,
    ) {
    }

    ngOnInit() {
        this.getBannerAdsList();
    }
    private getBannerAdsList() {
        this.bannerAdsService.getBannerAds().subscribe((result: any) => {
            this.bannerAds = result;
        }, err => {
            this.translate.get(err).subscribe(value => {
                this.toastr.error(value);
            })
        });
    }
}