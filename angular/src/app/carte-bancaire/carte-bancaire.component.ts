import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../Services/user-service.service';
import { Card } from '../models/card';
import { ActivatedRoute, Router } from '@angular/router';
import { CarteType } from '../enums/carte-type';
import { of } from 'rxjs';

@Component({
  selector: 'app-carte-bancaire',
  templateUrl: './carte-bancaire.component.html',
  styleUrls: ['./carte-bancaire.component.css']
})
export class CarteBancaireComponent implements OnInit {
  carte !: Array<Card>;
  showCardNumber: { [cardId: number]: boolean } = {}; // Object to track visibility for each card
  isPaused: { [cardId: number]: boolean } = {}; // Object to track pause state for each card

  constructor(
    private service: UserServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const accountId = params.get('id');
      console.log("-------- > > "+accountId);
      
      if (accountId) {
        this.getAllCartes(+accountId);
      } else {
        console.error('Account ID is missing in route parameters for CarteBancaireComponent');
        // Optionally display a user-friendly message
      }
    });
  }

  getAllCartes(id: number): void {
    this.service.get_all_Cartes(id).subscribe({
      next: (data: Array<Card>) => {
        this.carte = data;
        // Initialize showCardNumber and isPaused for each card
        this.carte.forEach(card => {
          this.showCardNumber[card.id_carte] = false;
          this.isPaused[card.id_carte] = false;
        });
      },
      error: (err: any) => {
        console.error('Error fetching card details', err);
      }
    });
  }

  getFormattedCardNumber(carte: Card): string {
    if (carte?.numero_carte) {
      return carte.numero_carte.replace(/(\d{4})(?=\d)/g, '$1 ');
    }
    return '';
  }

  getMaskedCardNumber(cardNumber: string, show: boolean): string {
    if (show) {
      return this.getFormattedCardNumber({ numero_carte: cardNumber } as Card);
    } else {
      // Mask all but the last 4 digits
      const formatted = this.getFormattedCardNumber({ numero_carte: cardNumber } as Card);
      const parts = formatted.split(' ');
      if (parts.length > 1) {
        return '* * * *  * * * *  * * * *  ' + parts[parts.length - 1];
      }
      return '**** **** **** ' + cardNumber.slice(-4);
    }
  }

  toggleCardNumber(cardId: number): void {
    this.showCardNumber[cardId] = !this.showCardNumber[cardId];
  }

  togglePause(card: Card): void {
    this.isPaused[card.id_carte] = !this.isPaused[card.id_carte];
    const newStatus = this.isPaused[card.id_carte] ? 'paused' : 'active';
    this.service.updateCardStatus(card.id_carte, newStatus).subscribe({
      next: (res: any) => {
        alert(`Card ${card.numero_carte} is now ${newStatus}.`);
        console.log('Card status updated:', res);
      },
      error: (err: any) => {
        console.error('Error updating card status:', err);
        // Revert UI state if backend call fails
        this.isPaused[card.id_carte] = !this.isPaused[card.id_carte];
        alert('Failed to update card status.');
      }
    });
  }

  viewHistory(accountId: number): void {
    this.router.navigate(['/transactions', accountId]);
  }

  async changePin(card: Card): Promise<void> {
    const newPin = prompt('Enter new PIN (4 digits):');
    if (newPin && newPin.length === 4 && /^\d+$/.test(newPin)) {
      this.service.updateCardPin(card.id_carte, newPin).subscribe({
        next: (res: any) => {
          alert('PIN changed successfully!');
          console.log('PIN updated:', res);
        },
        error: (err: any) => {
          console.error('Error changing PIN:', err);
          alert('Failed to change PIN.');
        }
      });
    } else if (newPin !== null) {
      alert('Invalid PIN. Please enter a 4-digit number.');
    }
  }

  orderPhysicalCard(card: Card): void {
    const confirmOrder = confirm('Are you sure you want to order a physical card for ' + card.numero_carte + '?');
    if (confirmOrder) {
      this.service.orderNewPhysicalCard(card.id_carte).subscribe({
        next: (res: any) => {
          alert('Physical card ordered successfully! It will be delivered in 5-7 business days.');
          console.log('Physical card ordered:', res);
        },
        error: (err: any) => {
          console.error('Error ordering physical card:', err);
          alert('Failed to order physical card.');
        }
      });
    }
  }

  goToSettings(): void {
    this.router.navigate(['/account-setting']); // Assuming this is the general settings page
  }

  getFormattedExpirationDate(card: Card): string {
    if (card?.expiration_date) {
      const [year, month] = card.expiration_date.split('-');
      return `${month}/${year.slice(-2)}`;
    }
    return '';
  }

  getCardLogo(cardType: CarteType): string {
    switch (cardType) {
      case CarteType.visa:
        return '../../assets/icons/visa.png';
      case CarteType.masterCard:
        return '../../assets/icons/mastercard.png';
      case CarteType.americanExpress:
        return '../../assets/icons/amex.png';
      default:
        return '../../assets/icons/default-card.png';
    }
  }
}
