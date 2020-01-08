import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerNameLikeComponent } from './customer-name-like.component';

describe('CustomerNameLikeComponent', () => {
  let component: CustomerNameLikeComponent;
  let fixture: ComponentFixture<CustomerNameLikeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerNameLikeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerNameLikeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
