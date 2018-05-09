import { ProjectSources } from './enum';

export const environment: IAppEnvironment = {
    projectSource: ProjectSources.JobsCentral,
    production: true,
    jobPortalApiUrl: 'https://demo-wsg-jobportal-api.azurewebsites.net/api/',
    pageTitle: 'Careers Connect in Singapore',
    pageTitleSuffix: 'Workforce SG',
    security: {
        tenant: 'systemtestcxsidentityusb2c.onmicrosoft.com',
        clientId: 'b18d64e4-d1dc-40fa-883a-f94861691306',
        scope: 'openid',
        responseType: 'id_token',
        signUpOrSignInPolicy: 'B2C_1_vip24_SignUpOrSignIn',
        signUpPolicy: 'B2C_1_vip24_SignUp',
        editProfilePolicy: 'B2C_1_vip24_EditProfile',
        passwordResetPolicy: 'B2C_1_vip24_ResetPassword',
        previousUrlBeforeLoggingIn: 'previousUrlBeforeLoggingIn',
        tokenName: 'jobseekersportal.security.token'
    },
    referenceLinks: {
        fairRegistrationLogOff: 'https://systemtest-fairregistration-sg-www.azurewebsites.net/Account/SignOut',
        vip24LogOff: 'https://systemtest-candidate-sg-www.azurewebsites.net/Account/logoff/',
        candidateApp: 'https://demo-wsg-jobchannel.azurewebsites.net/',
        candidateAppLogOff: 'https://demo-wsg-jobchannel.azurewebsites.net/logoff',
        hrTool: 'https://demo-wsg-ats.azurewebsites.net/'
    },
};
