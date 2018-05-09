import { Injectable } from '@angular/core';

@Injectable()

export class Spinner {
    display: boolean;

    constructor() {
        this.display = false;
    }
}

export class SpinnerService {
    spinner: Spinner = new Spinner();

    showSpinner() {
        this.spinner.display = true;
    }

    hideSpinner() {
        this.spinner.display = false;
    }
}
