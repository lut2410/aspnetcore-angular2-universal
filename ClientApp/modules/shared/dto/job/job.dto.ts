import { JobStatus } from '../../enums/job.enum';

export class Job {
    id: string;
    title: string;
    description: string;
    summary: string;
    applyBeforeDate: any;
    publishDate: any;
    company: string;
    companyId: string;
    companyName: string;
    addressLocation: string;
    countryLocation: string;
    longitude: string;
    latitude: string;
    externalJobId: string;
    jobCode: string;
    extentOfWork: number;
    professionalLevel: number;
    isFavorite: boolean;
    location: string;
    categories: Array<string>;
    status: JobStatus;

    constructor(jobData?: any) {
        if (!jobData) return;
        this.id = jobData.id;
        this.title = jobData.title;
        this.description = jobData.description;
        this.summary = jobData.summary;
        this.applyBeforeDate = jobData.applyBeforeDate instanceof Date ? jobData.applyBeforeDate : new Date(jobData.applyBeforeDate);
        this.publishDate = jobData.publishDate instanceof Date ? jobData.publishDate : new Date(jobData.publishDate);
        this.company = jobData.company;
        this.addressLocation = jobData.addressLocation;
        this.countryLocation = jobData.countryLocation;
        this.companyId = jobData.companyId;
        this.companyName = jobData.companyName;
        this.longitude = jobData.longitude;
        this.latitude = jobData.latitude;
        this.externalJobId = jobData.externalJobId;
        this.jobCode = jobData.jobCode;
        this.extentOfWork = jobData.extentOfWork;
        this.professionalLevel = jobData.professionalLevel;
        this.isFavorite = jobData.isFavorite;
        this.location = jobData.location;
        this.categories = jobData.categories;
        this.status = jobData.status;
    }
}
