import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRoadComponent } from './update-road.component';

describe('UpdateRoadComponent', () => {
  let component: UpdateRoadComponent;
  let fixture: ComponentFixture<UpdateRoadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateRoadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateRoadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
