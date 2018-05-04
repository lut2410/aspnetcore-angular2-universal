/* tslint:disable:no-unused-variable */

import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { CarouselComponent } from './carousel.component';

describe('Component: Carousel', () => {

	let component: CarouselComponent;
	let fixture: ComponentFixture<CarouselComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [CarouselComponent], // declare the test component
		});

		fixture = TestBed.createComponent(CarouselComponent);
		component = fixture.componentInstance;
	});

	it('should create an instance', () => {
		expect(component).toBeTruthy();
	});
});
