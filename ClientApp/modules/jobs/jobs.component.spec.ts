/* tslint:disable:no-unused-variable */

import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { JobsComponent } from './jobs.component';

describe('Component: Jobs', () => {

	let component: JobsComponent;
	let fixture: ComponentFixture<JobsComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [JobsComponent], // declare the test component
		});

		fixture = TestBed.createComponent(JobsComponent);
		component = fixture.componentInstance;
	});

	it('should create an instance', () => {
		expect(component).toBeTruthy();
	});
});
