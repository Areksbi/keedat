import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqContainer } from './faq.container';

describe('FaqComponent', () => {
  let component: FaqContainer;
  let fixture: ComponentFixture<FaqContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaqContainer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
