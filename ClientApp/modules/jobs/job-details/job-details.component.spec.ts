/* tslint:disable:no-unused-variable */

import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { JobDetailsComponent } from './job-details.component';

describe('Component: JobDetails', () => {

	let component: JobDetailsComponent;
	let fixture: ComponentFixture<JobDetailsComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [JobDetailsComponent], // declare the test component
		});

		fixture = TestBed.createComponent(JobDetailsComponent);
		component = fixture.componentInstance;
	});

	it('should create an instance', () => {
		expect(component).toBeTruthy();
	});
});
