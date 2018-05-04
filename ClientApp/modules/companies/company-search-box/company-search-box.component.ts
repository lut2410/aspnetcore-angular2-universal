import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AutocompleteComponent } from '../../shared/autocomplete/autocomplete.component';
import { AutocompleteParam } from '../../shared/autocomplete/autocompleteParam';
import { environment } from '../../../environments';
import { SearchConditionService } from '../../core/search-condition.service';

@Component({
    selector: 'app-company-search-box',
    templateUrl: './company-search-box.component.html',
    styleUrls: ['./company-search-box.component.scss']
})
export class CompanySearchBoxComponent {
    @Output() onSearch: EventEmitter<any> = new EventEmitter();
    public companyParam: AutocompleteParam = {
        placeholder: 'COMPANY.SEARCH_COMPANY_NAME',
        url: environment.jobPortalApiUrl + 'Companies/autocomplete',
        hasGroupTitle: false,
        minimumQueryStringLength: 2
    };
    public company = this.searchConditionService.getSearchCompanyCondition();

    constructor(private searchConditionService: SearchConditionService) { }

    public onSelected(event) {
        this.companySearch(event);
    }

    companySearch(event) {
        this.searchConditionService.setSearchCompanyCondition(this.company.name);
        this.onSearch.emit(event);
    }
}
