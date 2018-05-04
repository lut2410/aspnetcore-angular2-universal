import { Component, Injectable } from '@angular/core';

@Injectable()
export class LinkifyService {
    linkify(text) {
        if (text) {
            var findLink = /(href\=".*?")|(target\=".*?")/gi;
            text = text.replace(findLink,'$1 target="_blank"');
        }
        return text;
    }
}