import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateFootpathComponent } from './update-footpath.component';

describe('UpdateFootpathComponent', () => {
  let component: UpdateFootpathComponent;
  let fixture: ComponentFixture<UpdateFootpathComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateFootpathComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateFootpathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
