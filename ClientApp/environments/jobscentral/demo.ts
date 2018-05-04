import { ProjectSources } from './enum';

export const environment: IAppEnvironment = {
    projectSource: ProjectSources.JobsCentral,
    production: true,
    jobPortalApiUrl: 'https://staging-jobportal-api.azurewebsites.net/api/',
    pageTitle : 'Find Jobs, Internships, Work and Careers in Malaysia',
    pageTitleSuffix: 'HiredNOW.com.my',
    security: {
        tenant: 'systemtestcxsidentityusb2c.onmicrosoft.com',
        clientId: '2c60da5e-265d-43f7-ac68-a4888cf2dca3',
        scope: 'openid',
        responseType: 'id_token',
        signUpOrSignInPolicy: 'B2C_1_JobsCentral_SignUpOrSignIn',
        signUpPolicy: 'B2C_1_JobsCentral_SignUp',
        editProfilePolicy: 'B2C_1_JobsCentral_EditProfile',
        passwordResetPolicy: 'B2C_1_JobsCentral_ResetPassword',
        previousUrlBeforeLoggingIn: 'previousUrlBeforeLoggingIn',
        tokenName: 'jobseekersportal.security.token'
    },
    referenceLinks: {
        fairRegistrationLogOff: 'https://systemtest-fairregistration-sg-www.azurewebsites.net/Account/SignOut',
        vip24LogOff: 'https://systemtest-candidate-sg-www.azurewebsites.net/Account/logoff/',
        candidateApp: 'https://systemtest-jobchannel-sg-www.azurewebsites.net/',
        candidateAppLogOff: 'https://systemtest-jobchannel-sg-www.azurewebsites.net/logoff',
        hrTool: ''
    },
};
