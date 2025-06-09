import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../Services/user-service.service';
import { Beneficier } from '../models/account';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-beneficier',
  templateUrl: './beneficier.component.html',
  styleUrls: ['./beneficier.component.css']
})
export class BeneficierComponent implements OnInit {
  BeneficierList !: Beneficier[];
  accountId : any

  constructor(private service : UserServiceService , private fb : FormBuilder , private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
       this.accountId = params.get('id');
      console.log("-------- > > "+this.accountId);
      
      if (this.accountId) {
        this.getAllBeneficier(+this.accountId);
      }
    });
  }

  getAllBeneficier(id : number){
      this.service.get_all_beneficiers(id).subscribe(data => {
        this.BeneficierList = data;
      })
  }
  deleteBeneficier(id: number): void {
    this.service.delete_Beneficier(id).subscribe(() => {
      this.getAllBeneficier(this.accountId);
    }, error => {
      console.error('Error deleting beneficier:', error);
    });
  }

}
