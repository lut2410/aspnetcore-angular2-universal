/* tslint:disable:no-unused-variable */

import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { JobNavigationComponent } from './job-navigation.component';

describe('Component: JobNavigation', () => {

	let component: JobNavigationComponent;
	let fixture: ComponentFixture<JobNavigationComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [JobNavigationComponent], // declare the test component
		});

		fixture = TestBed.createComponent(JobNavigationComponent);
		component = fixture.componentInstance;
	});

	it('should create an instance', () => {
		expect(component).toBeTruthy();
	});
});
