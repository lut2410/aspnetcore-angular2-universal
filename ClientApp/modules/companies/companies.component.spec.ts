/* tslint:disable:no-unused-variable */

import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { CompaniesComponent } from './companies.component';


describe('Component: Companies', () => {

	let comp: CompaniesComponent;
	let fixture: ComponentFixture<CompaniesComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [CompaniesComponent], // declare the test component
		});

		fixture = TestBed.createComponent(CompaniesComponent);
		comp = fixture.componentInstance;
	});

	it('should create an instance', () => {
		expect(comp).toBeTruthy();
	});
});
