import { ProjectSources } from './enum';

export const environment: IAppEnvironment = {
    projectSource: ProjectSources.JobsCentral,
    production: true,
    jobPortalApiUrl: 'https://api.hirednow.com.my/api/',
    pageTitle : 'Find Jobs, Internships, Work and Careers in Malaysia',
    pageTitleSuffix: 'HiredNOW.com.my',
    security: {
        tenant: 'cxsidentityusb2c.onmicrosoft.com',
        clientId: 'ba7740af-5031-4c46-95be-c801a61a1071',
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
        fairRegistrationLogOff: 'https://careersandstudy.vip24.me/Account/SignOut',
        vip24LogOff: 'https://candidate.vip24.me/Account/logoff/',
        candidateApp: 'https://candidate.hirednow.com.my/',
        candidateAppLogOff: 'https://cv.responsivehr.com/logoff',
        hrTool: 'https://employer.hirednow.com.my'
    },
};
