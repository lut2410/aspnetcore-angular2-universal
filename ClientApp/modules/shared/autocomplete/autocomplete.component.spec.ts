/* tslint:disable:no-unused-variable */

import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AutocompleteComponent } from './autocomplete.component';

describe('Component: Autocomplete', () => {

	let component: AutocompleteComponent;
	let fixture: ComponentFixture<AutocompleteComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [AutocompleteComponent], // declare the test component
		});

		fixture = TestBed.createComponent(AutocompleteComponent);
		component = fixture.componentInstance;
	});

	it('should create an instance', () => {
		expect(component).toBeTruthy();
	});
});
