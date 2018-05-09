import { Injectable } from '@angular/core';

export class CacheDataDto {}

@Injectable()
export class CacheDataService {
    private cacheOject: CacheDataDto = {};

    getCache(key: string) {
        return this.cacheOject[key];
    }

    setCache(key: string, value: any) {
        this.cacheOject[key] = value;
        return (typeof this.cacheOject[key] === "object") && (this.cacheOject[key] !== null);
    }

    deleteCache(key: string) {
        delete this.cacheOject[key];
        return typeof this.cacheOject[key] !== "object";
    }

}
