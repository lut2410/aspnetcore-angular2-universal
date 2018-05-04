import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobSeekersComponent } from './job-seekers.component';

describe('JobSeekersComponent', () => {
  let component: JobSeekersComponent;
  let fixture: ComponentFixture<JobSeekersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobSeekersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobSeekersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
