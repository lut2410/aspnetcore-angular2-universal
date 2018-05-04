/* tslint:disable:no-unused-variable */

import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { CompanyListComponent } from './company-list.component';

describe('Component: CompanyList', () => {

	let component: CompanyListComponent;
	let fixture: ComponentFixture<CompanyListComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [CompanyListComponent], // declare the test component
		});

		fixture = TestBed.createComponent(CompanyListComponent);
		component = fixture.componentInstance;
	});

	it('should create an instance', () => {
		expect(component).toBeTruthy();
	});
});
