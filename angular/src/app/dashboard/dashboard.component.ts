import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import { RechargeService, RechargeTransaction } from '../Services/recharge.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  accountId!: number;
  userName: string = 'Cher Client'; // Placeholder for user's name
  currentAccountBalance: number = 5420.50; // Placeholder value
  savingsAccountBalance: number = 12345.67; // Placeholder value
  cryptoWalletBalance: number = 2.5; // Placeholder value (e.g., BTC amount)
  totalBalance: number = 17766.17; // Placeholder: currentAccount + savingsAccount + (cryptoValue in EUR)
  monthlyTransfersCount: number = 15; // Placeholder
  monthlyExpenses: number = 850.75; // Placeholder
  sidebarOpen: boolean = true; // Sidebar is visible by default on large screens

  constructor(
    private route: ActivatedRoute,
    // private rechargeService: RechargeService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.accountId = +idParam;
        // this.loadLatestRecharge(this.accountId);
      }
    });
  }

  // loadLatestRecharge(accountId: number): void {
  //   this.rechargeService.getRechargeHistory(accountId).subscribe(history => {
  //     if (history && history.length > 0) {
  //       this.latestRecharge = history[history.length - 1]; // Dernière recharge
  //     }
  //   });
  // }

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }
}
