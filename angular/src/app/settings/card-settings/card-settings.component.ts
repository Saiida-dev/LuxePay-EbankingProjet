import { Component, OnInit } from '@angular/core';
import { UserServiceService } from 'src/app/Services/user-service.service';
import { Card } from '../../models/card'; // Corrected relative path
import { JwtDto } from 'src/app/models/jwt-dto';
import { Router, ActivatedRoute } from '@angular/router';
import { CarteType } from 'src/app/enums/carte-type';
import { AccountDTO } from 'src/app/models/account-dto';

@Component({
  selector: 'app-card-settings',
  templateUrl: './card-settings.component.html',
  styleUrls: ['./card-settings.component.css']
})
export class CardSettingsComponent implements OnInit {
  cards: Card[] = [];
  accountId!: number; // To store the accountId from the route

  constructor(
    private service: UserServiceService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.accountId = +id; // Convert string to number
        this.getAllCards(this.accountId);
      } else {
        console.warn('Account ID not found in route. Attempting to get from localStorage.');
        // Fallback to localStorage if id is not in route params (e.g., direct navigation to /settings/cards)
        const storedJwtData = localStorage.getItem('jwtData');
        if (storedJwtData) {
          const jwtData: JwtDto = JSON.parse(storedJwtData);
          const userId = jwtData.user_id;
          // Assuming get_account fetches the primary account for the user, and we can get its ID
          this.service.get_account(userId).subscribe({
            next: (accountData: AccountDTO) => {
              this.accountId = accountData.id; // Corrected from id_compte to id
              this.getAllCards(this.accountId);
            },
            error: (err) => {
              console.error('Error fetching account for card settings:', err);
              this.router.navigate(['/login']); // Redirect to login if unable to get account
            }
          });
        } else {
          console.error('User not logged in or JWT data missing for CardSettingsComponent.');
          this.router.navigate(['/login']);
        }
      }
    });
  }

  getAllCards(accountId: number): void {
    this.service.get_all_Cartes(accountId).subscribe({
      next: (data: Card[]) => {
        this.cards = data;
        console.log('Fetched cards for settings:', this.cards);
      },
      error: (err: any) => {
        console.error('Error fetching card details for settings:', err);
      }
    });
  }

  getMaskedCardNumber(cardNumber: string): string {
    return cardNumber ? '**** **** **** ' + cardNumber.slice(-4) : '';
  }

  getCardLogo(cardType: CarteType): string {
    const typeString = cardType.toString().toLowerCase();
    switch (typeString) {
      case CarteType.visa.toLowerCase():
        return 'assets/icons/visa.png';
      case CarteType.masterCard.toLowerCase():
        return 'assets/icons/mastercard.png';
      case CarteType.americanExpress.toLowerCase():
        return 'assets/icons/amex.png'; // Assuming you have amex.png in assets/icons
      default:
        return 'assets/icons/default-card.png';
    }
  }

  goToAddCard(): void {
    if (this.accountId) {
      this.router.navigate(['/add-card', this.accountId]);
    } else {
      console.error('Account ID not available to add a card.');
      // Optionally, navigate to a general add card page or show an error
    }
  }

  formatExpirationDate(dateString: string): string {
    const date = new Date(dateString);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2);
    return `${month}/${year}`;
  }
}
