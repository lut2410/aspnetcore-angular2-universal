import { Injectable } from '@angular/core';
import { JobOrderBy } from '../shared/constants/jobOrderBy';

export class SearchConditionDto {
    what: string;
    where: string;
    categories: string[];
    extentOfWorks: Number[];
    professionalLevels: Number[];
    page: number;
    orderBy: JobOrderBy
}

export class SearchCompanyConditionDto {
    name: string;
}

@Injectable()

export class SearchConditionService {

    private searchConditions: SearchConditionDto = {
        what: '',
        where: '',
        categories: [],
        extentOfWorks: [],
        professionalLevels: [],
        page: 1,
        orderBy: JobOrderBy.LatestDate
    };

    private searchCompanyCondition: SearchCompanyConditionDto = {
        name: ''
    };

    get() {
        return JSON.parse(JSON.stringify(this.searchConditions));
    }

    set(value) {
        this.searchConditions = JSON.parse(JSON.stringify(value));
    }

    clearCategory() {
        this.searchConditions.categories = [];
    }

    getSearchCompanyCondition() {
        return JSON.parse(JSON.stringify(this.searchCompanyCondition));
    }

    setSearchCompanyCondition(value) {
        this.searchCompanyCondition.name = value;
    }

    clearSearchCompanyCondition() {
        this.searchCompanyCondition = {
            name: ''
        };
    }

    hasSearchJobCondidtions() {
        return this.searchConditions.categories.length +
            this.searchConditions.extentOfWorks.length +
            this.searchConditions.professionalLevels.length +
            this.searchConditions.what.length +
            this.searchConditions.where.length > 0;
    }

    setJobListCurrentPage(pageIndex: number) {
        this.searchConditions.page = pageIndex;
    }

    setJobOrderByCondition(orderBy: JobOrderBy) {
        this.searchConditions.orderBy = orderBy;
    }

    getJobOrderByCondition() {
        return JSON.parse(JSON.stringify(this.searchConditions.orderBy));
    }
}
