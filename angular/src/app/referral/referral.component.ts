import { Component, OnInit } from '@angular/core';

interface Filleul {
  name: string;
  inscriptionDate: string;
  status: 'Actif' | 'En attente';
  gain?: number;
}

@Component({
  selector: 'app-referral',
  templateUrl: './referral.component.html',
  styleUrls: ['./referral.component.css']
})
export class ReferralComponent implements OnInit {
  referralCode: string = '1FJAIE924ABC';
  filleuls: Filleul[] = [
    { name: 'Alice Dubois', inscriptionDate: '2023-01-15', status: 'Actif', gain: 50 },
    { name: 'Bob Martin', inscriptionDate: '2023-02-20', status: 'En attente' },
    { name: 'Charlie Dupont', inscriptionDate: '2023-03-01', status: 'Actif', gain: 50 },
    { name: 'Diana Lefevre', inscriptionDate: '2023-04-10', status: 'Actif', gain: 75 },
    { name: 'Eve Bernard', inscriptionDate: '2023-05-05', status: 'Actif', gain: 75 },
    { name: 'Frank Gallois', inscriptionDate: '2023-06-12', status: 'Actif', gain: 100 },
  ];

  totalFilleuls: number = 0;
  totalGains: number = 0;
  statutParrainage: string = '';

  rewardsProgram = [
    { status: 'Bronze', filleuls: '0–2 referrals', reward: '€50/referral' },
    { status: 'Gold', filleuls: '3–5 referrals', reward: '€75/referral + bonus' },
    { status: 'Platinum', filleuls: '6+ referrals', reward: '€100/referral + bonus' }
  ];

  constructor() { }

  ngOnInit(): void {
    this.calculateSummary();
  }

  calculateSummary(): void {
    this.totalFilleuls = this.filleuls.length;
    this.totalGains = this.filleuls.reduce((sum, filleul) => sum + (filleul.status === 'Actif' && filleul.gain ? filleul.gain : 0), 0);

    if (this.totalFilleuls >= 6) {
      this.statutParrainage = 'Platinum';
    } else if (this.totalFilleuls >= 3) {
      this.statutParrainage = 'Gold';
    } else {
      this.statutParrainage = 'Bronze';
    }
  }

  getTierProgress(tier: string): number {
    let progress = 0;
    const total = this.totalFilleuls;

    switch (tier.toLowerCase()) {
      case 'bronze':
        progress = (total / 2) * 100;
        break;
      case 'gold':
        if (total >= 3) {
          progress = ((total - 3) / (5 - 3)) * 100;
        } else if (total >= 0) {
          progress = 0;
        }
        break;
      case 'platinum':
        if (total >= 6) {
          progress = 100;
        } else if (total >= 0) {
            progress = 0; 
        }
        break;
    }
    return Math.min(100, Math.max(0, progress));
  }

  getRewardStatusIcon(status: string): string {
    return this.getIconPath(`${status.toLowerCase()}.png`);
  }

  getTierColorClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'bronze': return 'progress-bronze';
      case 'gold': return 'progress-gold';
      case 'platinum': return 'progress-platinum';
      default: return '';
    }
  }

  copyToClipboard(): void {
    navigator.clipboard.writeText(this.referralCode).then(() => {
      alert('Code de parrainage copié !');
    }).catch(err => {
      console.error('Could not copy text: ', err);
    });
  }

  shareByEmail(): void {
    const subject = encodeURIComponent('Rejoignez E-Bank et gagnez !');
    const body = encodeURIComponent(`Utilisez mon code de parrainage : ${this.referralCode} pour vous inscrire à E-Bank et profiter de nos services exceptionnels.`);
    window.open(`mailto:?subject=${subject}&body=${body}`);
  }

  shareOnWhatsApp(): void {
    const message = encodeURIComponent(`Rejoignez E-Bank avec mon code de parrainage : ${this.referralCode} !`);
    window.open(`https://wa.me/?text=${message}`);
  }

  getIconPath(iconName: string): string {
    // Assuming icons are in assets/icons/ for consistency
    return `assets/icons/${iconName}`;
  }

  getFilleulStatusClass(status: 'Actif' | 'En attente'): string {
    return status === 'Actif' ? 'status-active' : 'status-pending';
  }
}
