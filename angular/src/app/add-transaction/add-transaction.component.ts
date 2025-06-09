import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserServiceService } from '../Services/user-service.service';
import { Transaction} from '../models/account';
import { TransactionType } from '../enums/transaction-type';

@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.css']
})
export class AddTransactionComponent implements OnInit {
  transactionForm !: FormGroup;
  acountId !: number;

  constructor(
    private route: ActivatedRoute,
    private transactionService: UserServiceService,
    private fb: FormBuilder,
    private router : Router
  ) {
    this.transactionForm = this.fb.group({
      transactionDate: ['', Validators.required],
      transactionTimer: ['', Validators.required],
      montant: ['', Validators.required],
      type_transaction: ['', Validators.required],
      description_transaction: ['', Validators.required],
      bank_transaction: ['', Validators.required],
      beneficierId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const accountId = params.get('id');
      if (accountId) {
        this.acountId = +accountId;  // Convertir en nombre si nécessaire
        this.transactionForm.patchValue({ compteId: this.acountId });
      } else {
        console.error('Account ID is missing in route parameters');
        // Vous pouvez gérer cette situation comme vous le souhaitez (par exemple, rediriger ou afficher un message)
      }
    });
  }
  
  onSubmit() {
    if (this.transactionForm.valid) {
      const formValues = this.transactionForm.value;
      this.transactionService.add_transaction(formValues , this.acountId).subscribe(
        response => {
          console.log('Transaction added successfully:', response);
          this.router.navigate(['/transactions', this.acountId]);
        },
        error => {
          console.error('Error adding transaction:', error);
        }
      );
    }
  }
}
