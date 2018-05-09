import { environment } from '../../../environments';
import { ProjectSources } from '../../../enum';

const productSetting = getProductSetting();

function getProductSetting() {
  switch (environment.projectSource) {
    case ProjectSources.JobsCentral:
      return {
        companyName: 'hiredNow',
        imageLogoSource: 'assets/images/hirednow.svg',
        imageFooterLogoSource: 'assets/images/hirednow_white.svg',
        socialNetworkLinks: {
          contactLink: '',
          facebookLink: 'https://www.facebook.com/HiredNowMY/',
          twitterLink: '',
          linkedinLink: 'https://www.linkedin.com/company/jobscentral-malaysia',
          instagramLink: 'https://www.instagram.com/hirednowmy/',
          youtubeLink: ''
        }
      };
    case ProjectSources.TalentCorp:
      return {
        companyName: 'TalentCorp Malaysia',
        imageLogoSource: 'assets/images/jobscentral_01_home_logo-talentcorp.png',
        imageFooterLogoSource: 'assets/images/jobscentral_01_home_logo-talentcorp.png',
        socialNetworkLinks: {
          contactLink: 'http://staging.talentcorp.com.my/about-us/contact-us',
          facebookLink: 'https://www.facebook.com/TalentCorpMsia',
          twitterLink: 'https://twitter.com/TalentCorpMsia',
          linkedinLink: 'http://www.linkedin.com/company/talent-corporation-malaysia-berhad',
          instagramLink: 'https://www.instagram.com/talentcorpmsia/',
          youtubeLink: 'http://www.youtube.com/user/TalentCorpMsia'
        }
      };
    default:
      return {
        companyName: '',
        imageLogoSource: '',
        imageFooterLogoSource: '',
        socialNetworkLinks: {
          contactLink: '',
          facebookLink: '',
          twitterLink: '',
          linkedinLink: '',
          instagramLink: '',
          youtubeLink: ''
        }
      };
  }
}

export default productSetting;
