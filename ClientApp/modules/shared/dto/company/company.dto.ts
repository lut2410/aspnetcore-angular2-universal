import { Job } from '../job/job.dto';

export interface ICompany {
    id: string;
    name: string;
    description: string;
    footer: string;
    footerImages: string[];
    logo: string;
    banner: string;
    homepageUrl: HTMLLinkElement;
    jobs: Job[];
}

export class Company {
  id: string;
  name: string;
  description: string;
  footer: string;
  footerImages: string[];
  logo: string;
  jobNumber: number;
  banner: HTMLLinkElement;
  homePageUrl: HTMLLinkElement;
  jobs: Job[];

  constructor(companyData) {
    if (!companyData) {
      return;
    }
    this.id = companyData.id || null;
    this.name = companyData.name || '';
    this.description = companyData.description || '';
    this.footer = companyData.footer || '';
    this.footerImages = companyData.footerImages || '';
    this.banner = companyData.banner || './assets/images/microsite/jobscentral_04_company_bg.jpg';
    this.logo = companyData.logo || './assets/images/microsite/company_logo_default.svg';
    this.homePageUrl = companyData.homePageUrl || null;
    this.jobs = companyData.jobs;
  }
}
