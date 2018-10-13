import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplaySavedGamesComponent } from './display-saved-games.component';

describe('DisplaySavedGamesComponent', () => {
  let component: DisplaySavedGamesComponent;
  let fixture: ComponentFixture<DisplaySavedGamesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplaySavedGamesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplaySavedGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
