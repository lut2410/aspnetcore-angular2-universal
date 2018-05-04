/* tslint:disable:no-unused-variable */

import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { SalaryBoxComponent } from './salary-box.component';

describe('Component: SalaryBox', () => {

	let component: SalaryBoxComponent;
	let fixture: ComponentFixture<SalaryBoxComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [SalaryBoxComponent], // declare the test component
		});

		fixture = TestBed.createComponent(SalaryBoxComponent);
		component = fixture.componentInstance;
	});

	it('should create an instance', () => {
		expect(component).toBeTruthy();
	});
});
