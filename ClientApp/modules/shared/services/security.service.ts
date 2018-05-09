import { Router } from '@angular/router';
import { Injectable, Inject } from '@angular/core';
// import { ORIGIN_URL, REQUEST, } from '@nguniversal/aspnetcore-engine'; //TODO: convert to A5
//import { ORIGIN_URL, REQUEST } from '@nguniversal/aspnetcore-engine/tokens';
import { environment } from '../../../environments';
import { SessionStorageService } from './session-storage.service';

import * as jwt_decode from 'jwt-decode';

@Injectable()
export class SecurityService {

    private loginInProgress = false;
    private keys: any;
    private constants: any;
    private postLogoutRedirectUri: string;
    private redirectUri: string;

    constructor(private router: Router, 
        //@Inject(ORIGIN_URL) private originUrl: string, //TODO: convert to A5
        private storage: SessionStorageService) {
        const self = this;
        self.keys = {
            state: 'jobseekersportal.security.state',
            idTokenNonce: 'jobseekersportal.security.nonce',
            token: environment.security.tokenName
        };
        self.constants = {
            errorDescription: 'error_description',
            accessToken: 'access_token',
            idToken: 'id_token',
            state: 'state',
            nonce: 'nonce'
        };
        //TODO: convert to A5
        const hostUrl = 'https://' + window.location.host;
        self.postLogoutRedirectUri = hostUrl;
        self.redirectUri = `${hostUrl}/authentication`;
    }

    handleWindowCallback() {
        const self = this;

        const hash = window.location.hash;
        if (!self.isAuthorizedCallback(hash)) {
            return;
        }

        const requestInfo = self.getRequestInfo(hash);

        if (!requestInfo.valid) {
            return;
        }

        const securityState = self.getStorageItem(self.keys.state);
        const invalidState = requestInfo.parameters.hasOwnProperty(self.constants.state) &&
            !self.isEmpty(securityState) &&
            requestInfo.parameters[self.constants.state] !== securityState;
        if (invalidState) {
            return;
        }

        if (requestInfo.parameters.hasOwnProperty(self.constants.errorDescription)) {
            const errorDescription = requestInfo.parameters[self.constants.errorDescription];
            if (errorDescription.indexOf('AADB2C90118') >= 0) {
                self.forgotPassword();
                return;
            }
            self.router.navigateByUrl('/');
            return;
        }

        self.setStorageItem(self.keys.token, requestInfo.parameters[self.constants.idToken]);
        self.loginInProgress = false;
    }

    getUserInfo() {
        const self = this;
        const user = {
            isAuthenticated: false,
            profile: null,
            fullname: 'unknown'
        };

        const idToken = self.getStorageItem(self.keys.token);

        if (this.isEmpty(idToken)) {
            return user;
        }

        let authData;
        try {
            authData = jwt_decode(idToken);
        } catch (error) {
            return user;
        }


        if (authData && authData.aud === environment.security.clientId) {
            user.isAuthenticated = true;
            user.profile = authData;
            user.fullname = user.profile.given_name + ' ' + user.profile.family_name;
        }

        return user;
    }

    logOut() {
        const self = this;

        self.deleteStorageItem(self.keys.token);
        self.deleteStorageItem(self.keys.state);
        self.deleteStorageItem(self.keys.idTokenNonce);

        const url = 'https://login.microsoftonline.com/' + environment.security.tenant + '/oauth2/v2.0/logout?' +
            'p=' + encodeURI(environment.security.signUpOrSignInPolicy) + '&' +
            'post_logout_redirect_uri=' + encodeURIComponent(self.postLogoutRedirectUri);

        window.location.href = url;
    }

    login() {
        const self = this;

        if (self.loginInProgress) {
            return;
        }

        const state = self.generateRandomString();
        const nonce = self.generateRandomString();

        self.setStorageItem(self.keys.state, state);
        self.setStorageItem(self.keys.idTokenNonce, nonce);

        this.loginInProgress = true;
        const urlNavigate = 'https://login.microsoftonline.com/' +
            environment.security.tenant + '/oauth2/v2.0/authorize?' +
            'p=' + encodeURI(environment.security.signUpOrSignInPolicy) + '&' +
            'client_id=' + encodeURI(environment.security.clientId) + '&' +
            'state=' + encodeURIComponent(state) + '&' +
            'nonce=' + encodeURIComponent(nonce) + '&' +
            'redirect_uri=' + encodeURIComponent(self.redirectUri) + '&' +
            'scope=' + encodeURI(environment.security.scope) + '&' +
            'response_type=' + encodeURI(environment.security.responseType); ;

        window.location.href = urlNavigate;
    }

    signUp() {
        const self = this;

        const state = self.generateRandomString();
        const nonce = self.generateRandomString();

        self.setStorageItem(self.keys.state, state);
        self.setStorageItem(self.keys.idTokenNonce, nonce);

        const url = 'https://login.microsoftonline.com/' + environment.security.tenant + '/oauth2/v2.0/authorize?' +
            'p=' + encodeURI(environment.security.signUpPolicy) + '&' +
            'client_id=' + encodeURI(environment.security.clientId) + '&' +
            'redirect_uri=' + encodeURIComponent(self.redirectUri) + '&' +
            'state=' + encodeURIComponent(state) + '&' +
            'nonce=' + encodeURIComponent(nonce) + '&' +
            'scope=' + environment.security.scope + '&' +
            'response_type=' + environment.security.responseType;

        window.location.href = url;
    }

    editProfile() {
        const self = this;

        const state = self.generateRandomString();
        const nonce = self.generateRandomString();

        self.setStorageItem(self.keys.state, state);
        self.setStorageItem(self.keys.idTokenNonce, nonce);

        this.storePreviousUrlBeforeLogging();
        const url = 'https://login.microsoftonline.com/' + environment.security.tenant + '/oauth2/v2.0/authorize?' +
            'p=' + encodeURI(environment.security.editProfilePolicy) + '&' +
            'client_id=' + encodeURI(environment.security.clientId) + '&' +
            'redirect_uri=' + encodeURIComponent(self.redirectUri) + '&' +
            'state=' + encodeURIComponent(state) + '&' +
            'nonce=' + encodeURIComponent(nonce) + '&' +
            'scope=' + encodeURI(environment.security.scope) + '&' +
            'response_type=' + encodeURI(environment.security.responseType);
        window.location.href = url;
    }

    forgotPassword() {
        const self = this;

        const state = self.generateRandomString();
        const nonce = self.generateRandomString();

        self.setStorageItem(self.keys.state, state);
        self.setStorageItem(self.keys.idTokenNonce, nonce);

        const url = 'https://login.microsoftonline.com/' + environment.security.tenant + '/oauth2/v2.0/authorize?' +
            'p=' + encodeURI(environment.security.passwordResetPolicy) + '&' +
            'client_id=' + encodeURI(environment.security.clientId) + '&' +
            'redirect_uri=' + encodeURIComponent(self.redirectUri) + '&' +
            'state=' + encodeURIComponent(state) + '&' +
            'nonce=' + encodeURIComponent(nonce) + '&' +
            'scope=' + environment.security.scope + '&' +
            'response_type=' + environment.security.responseType;

        window.location.href = url;

    }

    storePreviousUrlBeforeLogging() {
        this.setStorageItem(environment.security.previousUrlBeforeLoggingIn, this.router.routerState.snapshot.url);
    }

    getPreviousUrlBeforeLogging() {
        const url = this.getStorageItem(environment.security.previousUrlBeforeLoggingIn) || '';
        this.deleteStorageItem(environment.security.previousUrlBeforeLoggingIn);
        return url;
    }

    private isAuthorizedCallback(hash) {
        const self = this;

        hash = self.getAuthorizedCallbackHash(hash);
        const parameters = self.deserializeQuery(hash);
        return (
            parameters.hasOwnProperty(this.constants.errorDescription) ||
            parameters.hasOwnProperty(this.constants.accessToken) ||
            parameters.hasOwnProperty(this.constants.idToken)
        );
    }

    private getAuthorizedCallbackHash(hash) {
        if (hash.indexOf('#/') > -1) {
            hash = hash.substring(hash.indexOf('#/') + 2);
        } else if (hash.indexOf('#') > -1) {
            hash = hash.substring(1);
        }

        return hash;
    }

    private deserializeQuery(query) {
        let match,
            pl = /\+/g,  // Regex for replacing addition symbol with a space
            search = /([^&=]+)=([^&]*)/g,
            decode = s => decodeURIComponent(s.replace(pl, ' ')),
            obj = {};
        match = search.exec(query);
        while (match) {
            obj[decode(match[1])] = decode(match[2]);
            match = search.exec(query);
        }

        return obj;
    }

    private getRequestInfo(hash) {
        const self = this;

        hash = self.getAuthorizedCallbackHash(hash);
        const parameters = self.deserializeQuery(hash);
        const requestInfo = {
            valid: false,
            parameters: {}
        };
        if (!parameters) {
            return requestInfo;
        }

        requestInfo.parameters = parameters;
        if (parameters.hasOwnProperty(this.constants.errorDescription) ||
            parameters.hasOwnProperty(this.constants.accessToken) ||
            parameters.hasOwnProperty(this.constants.idToken)) {

            requestInfo.valid = true;
        }

        return requestInfo;
    }

    private setStorageItem(key, value) {
        this.storage.set(key, value);
    }

    private getStorageItem(key) {
        return this.storage.get(key);
    }

    private deleteStorageItem(key) {
        this.storage.set(key, undefined);
    }

    private generateRandomString() {
        const source = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
        return source.replace(/[xy]/g, c => {
            const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    private isEmpty(str) {
        return (typeof str === 'undefined' || !str || 0 === str.length);
    }
}

