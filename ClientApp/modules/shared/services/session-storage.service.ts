import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable()
export class SessionStorageService {
    private isBrowser = isPlatformBrowser(this.platformId);

    constructor( @Inject(PLATFORM_ID) private platformId) { }

    get(key: string) {
        if (this.isBrowser) {
            const rawValue = sessionStorage.getItem(key);
            try {
                return JSON.parse(rawValue);
            } catch (error) {
                this.set(key, null);
            }
        }
        return null;
    }
    set<T>(key: string, value: T) {
        if (this.isBrowser) {
            const stringfyValue = JSON.stringify(value);
            sessionStorage.setItem(key, stringfyValue);
        }
    }
    getAsync<T>(key: string) {
        return new Promise((resolve) => {
            const value = this.get(key);
            resolve(value);
        });
    }
    setAsync<T>(key: string, value: T) {
        return new Promise((resolve) => {
            this.set(key, value);
            resolve();
        });
    }
}
