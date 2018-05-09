import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class JobsBusService {
    private messageCategoryFilterAnnouncedSource = new Subject<boolean>();
    private missionConfirmedSource = new Subject<boolean>();
    private messageSalaryAnnouncedSource = new Subject<boolean>();

    messageCategoryFilterAnnounced$ = this.messageCategoryFilterAnnouncedSource.asObservable();
    missionConfirmed$ = this.missionConfirmedSource.asObservable();

    confirmMission(message: boolean) {
        this.missionConfirmedSource.next(message);
    }

    announceCategoryFilter() {
        this.messageCategoryFilterAnnouncedSource.next(null);
    }

    announceSalaryFilter() {
        this.messageSalaryAnnouncedSource.next(null);
    }
}
