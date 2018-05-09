/* tslint:disable:no-unused-variable */

import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { CompanySearchBoxComponent } from './company-search-box.component';

describe('Component: CompanySearchBox', () => {

	let component: CompanySearchBoxComponent;
	let fixture: ComponentFixture<CompanySearchBoxComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [CompanySearchBoxComponent], // declare the test component
		});

		fixture = TestBed.createComponent(CompanySearchBoxComponent);
		component = fixture.componentInstance;
	});

	it('should create an instance', () => {
		expect(component).toBeTruthy();
	});
});
