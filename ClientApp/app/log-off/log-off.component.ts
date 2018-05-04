import { Component, AfterViewInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { environment } from '../../environments';
import { SecurityService } from '../../modules/shared/services/security.service';

@Component({
  selector: 'app-log-off',
  templateUrl: './log-off.component.html',
  styleUrls: ['./log-off.component.scss']
})
export class LogOffComponent implements AfterViewInit {

  constructor(private securityService: SecurityService,
    private domSanitizer: DomSanitizer) {
  }

  ngAfterViewInit() {
    this.securityService.logOut();
  }

}
