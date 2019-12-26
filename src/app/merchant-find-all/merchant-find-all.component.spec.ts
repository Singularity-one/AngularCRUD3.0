import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantFindAllComponent } from './merchant-find-all.component';

describe('MerchantFindAllComponent', () => {
  let component: MerchantFindAllComponent;
  let fixture: ComponentFixture<MerchantFindAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MerchantFindAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MerchantFindAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
