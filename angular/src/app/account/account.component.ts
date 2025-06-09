import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserServiceService } from '../Services/user-service.service';
import { Account } from '../models/account';
import { JwtDto } from '../models/jwt-dto';
import { AccountDTO } from '../models/account-dto';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  _form_add_account!: FormGroup;
  accounts: AccountDTO[] = [];
  showAddAccountForm: boolean = false;
  private userId!: number;

  constructor(private fb: FormBuilder, private service: UserServiceService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this._form_add_account = this.fb.group({
      accountNumber: [''],
      type: ['', Validators.required],
      solde: ['', [Validators.required, Validators.min(0)]],
      date_creation: ['', Validators.required],
      status: [true],
      user: [null],
      Beneficier: [[]],
      Transaction: [[]],
      Carte: [[]]
    });

    const storedJwtData = localStorage.getItem('jwtData');
    if (storedJwtData) {
      const jwtData: JwtDto = JSON.parse(storedJwtData);
      this.userId = jwtData.user_id;
      this.getAllUserAccounts(this.userId);
    } else {
      console.error('User not logged in or JWT data missing.');
      this.router.navigate(['/login']);
    }
  }

  getAllUserAccounts(userId: number): void {
    this.service.get_all_accounts(userId).subscribe({
      next: (data: AccountDTO[]) => {
        this.accounts = data;
        console.log('Fetched accounts:', this.accounts);
      },
      error: (err: any) => {
        console.error('Error fetching accounts:', err);
      }
    });
  }

  viewDetails(account: AccountDTO): void {
    alert(`Viewing details for account: ${account.accountNumber}`);
  }

  downloadStatement(account: AccountDTO): void {
    alert(`Downloading statement for account: ${account.accountNumber}`);
  }

  toggleAddAccountForm(): void {
    this.showAddAccountForm = !this.showAddAccountForm;
    if (!this.showAddAccountForm) {
      this._form_add_account.reset({
        status: true,
        Beneficier: [],
        Transaction: [],
        Carte: []
      });
    }
  }

  onSubmit() {
    if (this._form_add_account.valid) {
      const newAccount: Account = this._form_add_account.value;
      newAccount.user = { id: this.userId } as any;

      this.service.add_account(this.userId, newAccount).subscribe({
        next: (response: any) => {
          console.log('Account added successfully:', response);
          alert('Account added successfully!');
          this.getAllUserAccounts(this.userId);
          this.toggleAddAccountForm();
        },
        error: (error: any) => {
          console.error('Error adding account:', error);
          alert('Failed to add account.');
        }
      });
    }
  }
}
