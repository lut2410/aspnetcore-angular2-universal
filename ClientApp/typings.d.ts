// Typings reference file, see links for more information
// https://github.com/typings/typings
// https://www.typescriptlang.org/docs/handbook/writing-declaration-files.html

declare var System: any;

declare interface IAppEnvironment {
    projectSource: string;
    production: boolean;
    jobPortalApiUrl: string;
    pageTitle?: string,
    pageTitleSuffix?: string;
    security: {
        tenant: string;
        clientId: string;
        scope: string;
        responseType: string;
        signUpOrSignInPolicy: string;
        signUpPolicy: string;
        editProfilePolicy: string;
        passwordResetPolicy: string;
        previousUrlBeforeLoggingIn: string;
        tokenName: string;
    };
    referenceLinks?: {
        fairRegistrationLogOff: string;
        vip24LogOff: string;
        candidateApp: string;
        candidateAppLogOff: string;
        hrTool: string;
    };
}
