/* tslint:disable:no-unused-variable */

import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { CategoryFilterComponent } from './category-filter.component';

describe('Component: CategoryFilter', () => {

	let component: CategoryFilterComponent;
	let fixture: ComponentFixture<CategoryFilterComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [CategoryFilterComponent], // declare the test component
		});

		fixture = TestBed.createComponent(CategoryFilterComponent);
		component = fixture.componentInstance;
	});

	it('should create an instance', () => {
		expect(component).toBeTruthy();
	});
});
