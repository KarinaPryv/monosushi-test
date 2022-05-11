/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BottomMenuComponent } from './bottom-menu.component';

describe('BottomMenuComponent', () => {
  let component: BottomMenuComponent;
  let fixture: ComponentFixture<BottomMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BottomMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BottomMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
