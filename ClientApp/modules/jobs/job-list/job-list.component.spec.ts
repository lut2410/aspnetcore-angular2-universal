/* tslint:disable:no-unused-variable */

import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { JobListComponent } from './job-list.component';

describe('Component: JobList', () => {

	let component: JobListComponent;
	let fixture: ComponentFixture<JobListComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [JobListComponent], // declare the test component
		});

		fixture = TestBed.createComponent(JobListComponent);
		component = fixture.componentInstance;
	});

	it('should create an instance', () => {
		expect(component).toBeTruthy();
	});
});
