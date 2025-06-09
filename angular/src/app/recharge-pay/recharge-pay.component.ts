import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RechargeService, RechargeServiceType, RechargeTransaction } from 'src/app/Services/recharge.service';
import { MobileOperator } from 'src/app/enums/mobile-operator.enum';

@Component({
  selector: 'app-recharge-pay',
  templateUrl: './recharge-pay.component.html',
  styleUrls: ['./recharge-pay.component.css']
})
export class RechargePayComponent implements OnInit {
  rechargeForm!: FormGroup;
  accountId!: number;
  serviceId!: number;
  selectedService!: RechargeServiceType | undefined;
  mobileOperators = Object.values(MobileOperator);
  subscriptionDurations = ['1 month', '3 months', '6 months', '1 year'];
  spotifyPlans = ['Individual', 'Duo', 'Family', 'Student'];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public rechargeService: RechargeService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const accId = params.get('accountId');
      const servId = params.get('serviceId');

      if (accId && servId) {
        this.accountId = +accId;
        this.serviceId = +servId;
        this.loadServiceDetails();
      } else {
        console.error('Account ID or Service ID missing for recharge payment.');
        this.router.navigate(['/recharge-list', this.accountId]); // Redirect to service selection
      }
    });
  }

  loadServiceDetails(): void {
    this.rechargeService.getServiceTypes().subscribe(services => {
      this.selectedService = services.find(s => s.id === this.serviceId);
      if (!this.selectedService) {
        console.error('Selected service not found.');
        this.router.navigate(['/recharge-list', this.accountId]);
      }
      this.initForm();
    });
  }

  initForm(): void {
    const formControls: any = {
      amount: ['', [Validators.required, Validators.min(1)]],
    };

    switch (this.selectedService?.name) {
      case 'Mobile Credit':
        formControls.accountNumber = ['', Validators.required];
        formControls.operator = ['', Validators.required];
        break;
      case 'Netflix':
        formControls.email = ['', [Validators.required, Validators.email]];
        formControls.duration = ['']; // Optional
        break;
      case 'Spotify':
        formControls.email = ['', [Validators.required, Validators.email]];
        formControls.password = ['', Validators.required];
        formControls.plan = ['']; // Optional
        break;
      case 'Electricity':
      case 'Internet':
        formControls.customerIdentifier = ['', Validators.required];
        formControls.regionReference = ['']; // Optional
        break;
      default:
        formControls.genericIdentifier = ['', Validators.required]; // Fallback
        break;
    }

    this.rechargeForm = this.fb.group(formControls);
  }

  onSubmit(): void {
    if (this.rechargeForm.valid && this.selectedService) {
      const newRecharge: RechargeTransaction = {
        id: 0,
        serviceType: this.selectedService.name,
        amount: this.rechargeForm.value.amount,
        date: '',
        status: '',
      };

      newRecharge.payload = {};

      switch (this.selectedService.name) {
        case 'Mobile Credit':
          newRecharge.accountNumber = this.rechargeForm.value.accountNumber;
          newRecharge.operator = this.rechargeForm.value.operator;
          break;
        case 'Netflix':
          newRecharge.payload['email'] = this.rechargeForm.value.email;
          newRecharge.payload['duration'] = this.rechargeForm.value.duration;
          break;
        case 'Spotify':
          newRecharge.payload['email'] = this.rechargeForm.value.email;
          newRecharge.payload['password'] = this.rechargeForm.value.password;
          newRecharge.payload['plan'] = this.rechargeForm.value.plan;
          break;
        case 'Electricity':
        case 'Internet':
          newRecharge.payload['customerIdentifier'] = this.rechargeForm.value.customerIdentifier;
          newRecharge.payload['regionReference'] = this.rechargeForm.value.regionReference;
          break;
        default:
          newRecharge.payload['genericIdentifier'] = this.rechargeForm.value.genericIdentifier;
          break;
      }

      this.rechargeService.performRecharge(newRecharge).subscribe({
        next: (response) => {
          alert(`Recharge for ${response.serviceType} of ${response.amount} USD successful!`);
          console.log('Recharge successful:', response);
          this.router.navigate(['/recharge-history', this.accountId]);
        },
        error: (err) => {
          console.error('Recharge failed:', err);
          alert('Recharge failed: ' + (err.error?.message || err.message));
        }
      });
    } else {
      alert('Please fill in all required fields correctly.');
    }
  }
} 