/* tslint:disable:no-unused-variable */

import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { MainNavigationComponent } from './main-navigation.component';

describe('Component: MainNavigation', () => {

	let component: MainNavigationComponent;
	let fixture: ComponentFixture<MainNavigationComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [MainNavigationComponent], // declare the test component
		});

		fixture = TestBed.createComponent(MainNavigationComponent);
		component = fixture.componentInstance;
	});

	it('should create an instance', () => {
		expect(component).toBeTruthy();
	});
});
