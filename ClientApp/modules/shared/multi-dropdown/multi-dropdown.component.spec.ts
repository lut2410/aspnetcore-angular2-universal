/* tslint:disable:no-unused-variable */

import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { MultiDropdownComponent } from './multi-dropdown.component';

describe('Component: MultiDropdown', () => {

	let component: MultiDropdownComponent;
	let fixture: ComponentFixture<MultiDropdownComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [MultiDropdownComponent], // declare the test component
		});

		fixture = TestBed.createComponent(MultiDropdownComponent);
		component = fixture.componentInstance;
	});

	it('should create an instance', () => {
		expect(component).toBeTruthy();
	});
});
