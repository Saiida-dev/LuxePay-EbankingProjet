import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeneficierComponent } from './beneficier.component';

describe('BeneficierComponent', () => {
  let component: BeneficierComponent;
  let fixture: ComponentFixture<BeneficierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeneficierComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BeneficierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
