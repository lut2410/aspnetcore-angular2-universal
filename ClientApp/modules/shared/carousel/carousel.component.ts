import { Component, OnInit, PLATFORM_ID, Inject, OnDestroy } from '@angular/core';
import { environment } from '../../../environments';
import { ProjectSources } from '../../../enum';
import { MobileService } from '../../core/mobile.service';
import { isPlatformBrowser } from '@angular/common';
declare var jQuery: any;

@Component({
    selector: 'app-carousel',
    templateUrl: './carousel.component.html',
    styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit, OnDestroy {

    imageList: Array<''>;
    private isBrowser = isPlatformBrowser(this.platformId);
    private slideIntervalHandle: number;

    constructor(
        @Inject(PLATFORM_ID) private platformId,
        private mobileService: MobileService) { }

    ngOnInit(): void {
        const self = this;
        let dir = '';
        if (environment.projectSource === ProjectSources.JobsCentral) { dir = './assets/images/home-carousel/'; }
        if (environment.projectSource === ProjectSources.TalentCorp) { dir = './assets/images/home-carousel-talentcorp/'; }
        self.imageList = self.getImageList(dir);
        if (self.isBrowser) {
            self.slide();
        }
    }

    ngOnDestroy(): void {
        const self = this;
        if (self.isBrowser && self.slideIntervalHandle) {
            window.clearInterval(self.slideIntervalHandle);
        }
    }

    getImageList(dir) {
        const self = this;
        const imageList = [];
        let totalImage = 4;

        if (environment.projectSource === ProjectSources.TalentCorp) {
            totalImage = 3;
        }

        for (let i = 1; i <= totalImage; i++) {
            if (self.isBrowser && window.matchMedia('screen and (max-width: 767px)').matches) {
                imageList.push(dir + 'mobile/' + 'jobscentral_01_home_bg0' + i + '_mobile.jpg');
            } else if (self.isBrowser && window.matchMedia('(min-width: 768px) and (max-width: 1200px)').matches) {
                imageList.push(dir + 'tablet/' + 'jobscentral_01_home_bg0' + i + '_tablet.jpg');
            } else {
                imageList.push(dir + 'jobscentral_01_home_bg0' + i + '.jpg');
            };
        }

        return imageList;
    };

    slide() {
        const self = this;
        if (!this.isBrowser) return;

        const $slider = jQuery('.slider');
        const $slide = 'li';
        const $transition_time = 2000;
        const $time_between_slides = 4000;

        function slides() {
            return $slider.find($slide);
        }

        slides().fadeOut();

        slides().first().addClass('active');
        slides().first().fadeIn($transition_time);

        self.slideIntervalHandle = window.setInterval(
            function () {
                let $i = $slider.find($slide + '.active').index();
                slides().eq($i).removeClass('active');
                if (slides().length === $i + 1) $i = -1;
                slides().eq($i + 1).addClass('active');
            }
            , $transition_time + $time_between_slides
        );
    };
}
