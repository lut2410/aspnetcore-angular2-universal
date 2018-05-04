/* tslint:disable:no-unused-variable */

import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { MainSpinnerComponent } from './main-spinner.component';

describe('Component: MainSpinner', () => {

	let component: MainSpinnerComponent;
	let fixture: ComponentFixture<MainSpinnerComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [MainSpinnerComponent], // declare the test component
		});

		fixture = TestBed.createComponent(MainSpinnerComponent);
		component = fixture.componentInstance;
	});

	it('should create an instance', () => {
		expect(component).toBeTruthy();
	});
});
