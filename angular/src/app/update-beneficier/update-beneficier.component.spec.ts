import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBeneficierComponent } from './update-beneficier.component';

describe('UpdateBeneficierComponent', () => {
  let component: UpdateBeneficierComponent;
  let fixture: ComponentFixture<UpdateBeneficierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateBeneficierComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateBeneficierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
