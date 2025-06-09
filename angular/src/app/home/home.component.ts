import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface Feature {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  features: Feature[] = [
    { icon: 'shield', title: 'Sécurité Maximale', description: 'Protection avancée avec authentification 2FA' },
    { icon: 'credit-card', title: 'Comptes Multiples', description: 'Gérez tous vos comptes en un seul endroit' },
    { icon: 'smartphone', title: 'Recharges Mobiles', description: 'Rechargez vos téléphones instantanément' },
    { icon: 'trending-up', title: 'Crypto Trading', description: 'Investissez dans les cryptomonnaies' }
  ];

  constructor(private router: Router) {}

  goToLogin() {
    this.router.navigate(['/login']);
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}