import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SecurityService } from '../../modules/shared/services/security.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
    styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {

  constructor(private securityService: SecurityService, private router: Router) { }

  ngOnInit() {
    const isAuthenticated = this.securityService.getUserInfo().isAuthenticated;
    if (!isAuthenticated) {
      return this.router.navigateByUrl('/');
    }

    const previousUrlBeforeLogging = this.securityService.getPreviousUrlBeforeLogging();
    this.router.navigateByUrl(previousUrlBeforeLogging);
  }

}
