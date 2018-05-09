/* tslint:disable:no-unused-variable */

import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { HomeComponent } from './home.component';

describe('Component: Home', () => {

	let component: HomeComponent;
	let fixture: ComponentFixture<HomeComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [HomeComponent], // declare the test component
		});

		fixture = TestBed.createComponent(HomeComponent);
		component = fixture.componentInstance;
	});

	it('should create an instance', () => {
		expect(component).toBeTruthy();
	});
});
