/* tslint:disable:no-unused-variable */

import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { HomeSearchJobComponent } from './home-search-job.component';

describe('Component: HomeSearchJob', () => {

	let component: HomeSearchJobComponent;
	let fixture: ComponentFixture<HomeSearchJobComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [HomeSearchJobComponent], // declare the test component
		});

		fixture = TestBed.createComponent(HomeSearchJobComponent);
		component = fixture.componentInstance;
	});

	it('should create an instance', () => {
		expect(component).toBeTruthy();
	});
});
