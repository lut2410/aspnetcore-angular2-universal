import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { MobileService } from '../../core/mobile.service';
import { JobsBusService } from '../services/jobs-bus.service';

@Component({
    selector: 'app-salary-box',
    templateUrl: './salary-box.component.html',
    styleUrls: ['./salary-box.component.scss']
})
export class SalaryBoxComponent implements OnInit {
    private _subscription: Subscription;
    public isMobile: boolean = Boolean(this._mobieDetectSvc.isMobile());
    public isTablet: boolean = Boolean(this._mobieDetectSvc.isTablet());

    salary = {
        num: 0,
        type: 'Monthly',
        sum: '',
        negotiable: false
    };

    constructor(public _mobieDetectSvc: MobileService, private _jobsBusService: JobsBusService) {
        const self = this;
        self._subscription = _jobsBusService.messageCategoryFilterAnnounced$.subscribe(
            () => { self.clearSalary(); });
    }

    ngOnInit() {
        this.changeSalarySum(this.salary);
    }

    changeSalaryType(event) {
        if (this.salary.negotiable) return;

        this.salary.type = event.target.textContent;
        this.changeSalarySum(this.salary);
    }

    changeSalaryNum(event) {
        this.salary.num = event;
        this.changeSalarySum(this.salary);
    }

    changeSalaryNego(event) {
        this.salary.negotiable = event;
        this.changeSalarySum(this.salary);
    }

    changeSalarySum(salary) {
        if (salary.negotiable) {
            salary.sum = 'Negotiable';
        } else {
            salary.num = (salary.num > 0) ? salary.num : 0;
            salary.sum = salary.type + ' from $' + salary.num;
        }
    }

    clearSalary(): void {
        this.salary.negotiable = false;
        this.salary.num = 0;
    }
}
