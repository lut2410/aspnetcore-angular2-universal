import './polyfills.server';

import { enableProdMode } from '@angular/core';
import { IEngineOptions, ngAspnetCoreEngine } from '@nguniversal/aspnetcore-engine';
import { BootFuncParams, createServerRenderer } from 'aspnet-prerendering';

import { AppModuleServer } from './app/app.module.server';

enableProdMode();

export default createServerRenderer((params: BootFuncParams) => {

    // Platform-server provider configuration
    const setupOptions: IEngineOptions = {
        appSelector: '<app-root></app-root>',
        ngModule: AppModuleServer,
        request: params,
        providers: [
            // Optional - Any other Server providers you want to pass (remember you'll have to provide them for the Browser as well)
        ]
    };

    return ngAspnetCoreEngine(setupOptions).then(response => {
        // Apply your transferData to response.globals
        // response.globals.transferData = createTransferScript({
        //   someData: 'Transfer this to the client on the window.TRANSFER_CACHE {} object',
        //   fromDotnet: params.data.thisCameFromDotNET // example of data coming from dotnet, in HomeController
        // });

        return ({
            html: response.html,
            globals: response.globals
        });
    });
});
