import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiRadioComponent } from './multi-radio.component';

describe('MultiRadioComponent', () => {
  let component: MultiRadioComponent;
  let fixture: ComponentFixture<MultiRadioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiRadioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
