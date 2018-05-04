/* tslint:disable:no-unused-variable */

import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { CompanyDetailsComponent } from './company-details.component';

describe('Component: CompanyDetails', () => {

	let comp: CompanyDetailsComponent;
	let fixture: ComponentFixture<CompanyDetailsComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [CompanyDetailsComponent], // declare the test component
		});

		fixture = TestBed.createComponent(CompanyDetailsComponent);
		comp = fixture.componentInstance;
	});

	it('should create an instance', () => {
		expect(comp).toBeTruthy();
	});
});
