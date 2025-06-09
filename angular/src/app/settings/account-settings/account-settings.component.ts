import { Component, OnInit } from '@angular/core';
import { UserServiceService } from 'src/app/Services/user-service.service';
import { Account } from 'src/app/models/account';
import { AccountDTO } from 'src/app/models/account-dto';
import { JwtDto } from 'src/app/models/jwt-dto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit {
  account!: AccountDTO; // To hold the single account details

  constructor(private service: UserServiceService, private router: Router) { }

  ngOnInit(): void {
    const storedJwtData = localStorage.getItem('jwtData');
    if (storedJwtData) {
      const jwtData: JwtDto = JSON.parse(storedJwtData);
      const userId = jwtData.user_id;
      this.getAccountDetails(userId);
    } else {
      console.error('User not logged in or JWT data missing for AccountSettingsComponent.');
      this.router.navigate(['/login']);
    }
  }

  getAccountDetails(userId: number): void {
    // Assuming get_account fetches the primary account for the user
    // If your backend get_account(id) expects accountId, you might need a different service method here
    // For now, I'm assuming get_account will fetch a relevant account for the userId.
    // If there are multiple accounts, you might need to specify which one to display here.
    this.service.get_account(userId).subscribe({
      next: (data: AccountDTO) => {
        this.account = data;
        console.log('Fetched account for settings:', this.account);
      },
      error: (err: any) => {
        console.error('Error fetching account details for settings:', err);
      }
    });
  }

  goToAddAccount(): void {
    // Assuming the user needs to be logged in to add an account, we use the stored userId
    const storedJwtData = localStorage.getItem('jwtData');
    if (storedJwtData) {
      const jwtData: JwtDto = JSON.parse(storedJwtData);
      const userId = jwtData.user_id;
      this.router.navigate(['/account-setting', userId]); // Navigate to the AccountComponent to add a new account
    } else {
      console.error('User not logged in. Cannot navigate to add account.');
      this.router.navigate(['/login']);
    }
  }

  // Helper to get only last 4 digits for display
  getMaskedAccountNumber(accountNumber: string): string {
    return accountNumber ? accountNumber.slice(-4) : '';
  }
}
