import { ProjectSources } from './enum';

export const environment: IAppEnvironment = {
    projectSource: ProjectSources.TalentCorp,
    production: true,
    jobPortalApiUrl: 'https://demo-jobseekerportal-talentcorp-api.azurewebsites.net/api/',
    pageTitle: 'Find Jobs, Internships, Work and Careers',
    pageTitleSuffix: 'Talent Corp',
    security: {
        tenant: 'systemtestcxsidentityusb2c.onmicrosoft.com',
        clientId: '63be46ae-5dfa-465b-947d-30ea97184175',
        scope: 'openid',
        responseType: 'id_token',
        signUpOrSignInPolicy: 'B2C_1_TalentCorp_SignUpOrSignIn',
        signUpPolicy: 'B2C_1_TalentCorp_SignUpOrSignIn', // temporary use SignUpOrSignIn until clarify with Conexus and CXS
        editProfilePolicy: 'B2C_1_TalentCorp_EditProfile',
        passwordResetPolicy: 'B2C_1_TalentCorp_ResetPassword',
        previousUrlBeforeLoggingIn: 'previousUrlBeforeLoggingIn',
        tokenName: 'jobseekersportal.security.token'
    },
    referenceLinks: {
        fairRegistrationLogOff: 'https://systemtest-fairregistration-sg-www.azurewebsites.net/Account/SignOut',
        vip24LogOff: 'https://systemtest-talentcorp.vip24.me/Account/logoff/',
        candidateApp: 'https://systemtest-jobchannel-sg-www.azurewebsites.net/',
        candidateAppLogOff: 'https://systemtest-jobchannel-sg-www.azurewebsites.net/logoff',
        hrTool: ''
    },
};
