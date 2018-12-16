/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SubplayercardComponent } from './subplayercard.component';

describe('SubplayercardComponent', () => {
  let component: SubplayercardComponent;
  let fixture: ComponentFixture<SubplayercardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubplayercardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubplayercardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
