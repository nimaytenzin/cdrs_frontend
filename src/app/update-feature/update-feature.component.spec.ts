import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateFeatureComponent } from './update-feature.component';

describe('UpdateFeatureComponent', () => {
  let component: UpdateFeatureComponent;
  let fixture: ComponentFixture<UpdateFeatureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateFeatureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
