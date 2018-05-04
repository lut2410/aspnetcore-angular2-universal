import { Component, OnInit } from '@angular/core';

import { Spinner, SpinnerService } from '../spinner.service';

@Component({
    selector: 'app-main-spinner',
    templateUrl: './main-spinner.component.html',
    styleUrls: ['./main-spinner.component.scss']
})

export class MainSpinnerComponent implements OnInit {
    spinner: Spinner;

    constructor(private spinnerService: SpinnerService) { }

    ngOnInit() {
        this.spinner = this.spinnerService.spinner;
    }

}
