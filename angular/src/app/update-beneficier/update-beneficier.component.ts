import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserServiceService } from '../Services/user-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Beneficier } from '../models/account';

@Component({
  selector: 'app-update-beneficier',
  templateUrl: './update-beneficier.component.html',
  styleUrls: ['./update-beneficier.component.css']
})
export class UpdateBeneficierComponent implements OnInit {
  beneficier!: Beneficier;
  formBeneficier!: FormGroup;
  Id !:any
  constructor(
    private fb: FormBuilder,
    private service: UserServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.formBeneficier = this.fb.group({
      id: [''],
      username: [''],
      bank: [''],
      account_number: [''],
      compteId: ['']
    });
    this.route.paramMap.subscribe(params => {
      const Id: any = params.get('idB');
      if (Id) {
        this.service.get_Beneficier(Id).subscribe(data => {
          this.beneficier = data;
          this.formBeneficier.patchValue({
            id: this.beneficier.id,
            username: this.beneficier.username,
            bank: this.beneficier.bank,
            account_number: this.beneficier.account_number,
            compteId: this.beneficier.compte.id,
          });
        });
      }
    });
  }

  onSubmit(): void {
    if (this.formBeneficier.valid) {
      const updatedBeneficier: Beneficier = {
        ...this.formBeneficier.value,
        compte: { id: this.formBeneficier.value.compteId }
      };
      this.service.update_Beneficier(updatedBeneficier.id, updatedBeneficier).subscribe(() => {
        this.router.navigate([`/dashboard/${updatedBeneficier.compte.id}`]);
      });
    }
  }
}
