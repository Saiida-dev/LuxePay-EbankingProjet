import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RechargeService, RechargeServiceType } from 'src/app/Services/recharge.service';

@Component({
  selector: 'app-recharge-list',
  templateUrl: './recharge-list.component.html',
  styleUrls: ['./recharge-list.component.css']
})
export class RechargeListComponent implements OnInit {
  serviceTypes: RechargeServiceType[] = [];
  accountId!: number; // To pass to the payment component

  constructor(
    public rechargeService: RechargeService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.accountId = +id;
      } else {
        console.error('Account ID not found in route for recharge list.');
        // Handle case where account ID is missing, e.g., redirect to account selection
        this.router.navigate(['/dashboard']); // Or a more appropriate fallback
      }
    });

    this.rechargeService.getServiceTypes().subscribe(data => {
      this.serviceTypes = data;
    });
  }

  selectService(service: RechargeServiceType): void {
    this.router.navigate(['/recharge-pay', this.accountId, service.id]);
  }
} 