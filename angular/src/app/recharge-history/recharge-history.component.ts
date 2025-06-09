import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RechargeService, RechargeTransaction } from 'src/app/Services/recharge.service';

@Component({
  selector: 'app-recharge-history',
  templateUrl: './recharge-history.component.html',
  styleUrls: ['./recharge-history.component.css']
})
export class RechargeHistoryComponent implements OnInit {
  rechargeHistory: RechargeTransaction[] = [];
  accountId!: number;

  constructor(
    private rechargeService: RechargeService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.accountId = +id;
        this.loadRechargeHistory(this.accountId);
      } else {
        console.error('Account ID not found in route for recharge history.');
        this.router.navigate(['/dashboard']); // Fallback
      }
    });
  }

  loadRechargeHistory(accountId: number): void {
    this.rechargeService.getRechargeHistory(accountId).subscribe({
      next: (data) => {
        this.rechargeHistory = data;
        console.log('Recharge History:', this.rechargeHistory);
      },
      error: (err) => {
        console.error('Error fetching recharge history:', err);
      }
    });
  }
} 