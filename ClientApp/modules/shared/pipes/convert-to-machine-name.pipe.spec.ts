/* tslint:disable:no-unused-variable */

import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { ConvertToMachineNamePipe } from './convert-to-machine-name.pipe';

describe('Pipe: ConvertToMachineName', () => {

	let component: ConvertToMachineNamePipe;
	let fixture: ComponentFixture<ConvertToMachineNamePipe>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [ConvertToMachineNamePipe], // declare the test component
		});

		fixture = TestBed.createComponent(ConvertToMachineNamePipe);
		component = fixture.componentInstance;
	});

	it('create an instance', () => {
		expect(component).toBeTruthy();
	});
});
