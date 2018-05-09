/* tslint:disable:no-unused-variable */

import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { JobSearchBoxComponent } from './job-search-box.component';

describe('Component: JobSearchBox', () => {

	let component: JobSearchBoxComponent;
	let fixture: ComponentFixture<JobSearchBoxComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [JobSearchBoxComponent], // declare the test component
		});

		fixture = TestBed.createComponent(JobSearchBoxComponent);
		component = fixture.componentInstance;
	});

	it('should create an instance', () => {
		expect(component).toBeTruthy();
	});
});
