import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface RechargeServiceType {
  id: number;
  name: string;
  icon: string;
  category: string;
}

export interface RechargeTransaction {
  id: number;
  serviceType: string;
  amount: number;
  date: string;
  status: string;
  accountNumber?: string;
  operator?: string;
  payload?: Record<string, any>; // Flexible field for dynamic data
  // Add any other relevant fields
}

@Injectable({
  providedIn: 'root'
})
export class RechargeService {

  private mockServiceTypes: RechargeServiceType[] = [
    { id: 1, name: 'Electricity', icon: 'electricity.png', category: 'Utility' },
    { id: 2, name: 'Internet', icon: 'internet.png', category: 'Telecom' },
    { id: 3, name: 'Netflix', icon: 'netflix.png', category: 'Entertainment' },
    { id: 4, name: 'Spotify', icon: 'spotify.png', category: 'Entertainment' },
    { id: 5, name: 'Mobile Credit', icon: 'mobile.png', category: 'Telecom' },
    // Add more services as needed
  ];

  private mockRechargeHistory: RechargeTransaction[] = [
    { id: 1, serviceType: 'Electricity', amount: 50, date: '2024-05-20', status: 'Completed' },
    { id: 2, serviceType: 'Mobile Credit', amount: 10, date: '2024-05-15', status: 'Completed' },
    { id: 3, serviceType: 'Netflix', amount: 15, date: '2024-05-10', status: 'Pending' },
  ];

  constructor() { }

  getServiceTypes(): Observable<RechargeServiceType[]> {
    return of(this.mockServiceTypes);
  }

  getRechargeHistory(accountId: number): Observable<RechargeTransaction[]> {
    // In a real app, you'd filter by accountId or fetch from backend
    return of(this.mockRechargeHistory);
  }

  performRecharge(transaction: RechargeTransaction): Observable<RechargeTransaction> {
    // Simulate API call
    const newId = this.mockRechargeHistory.length > 0 ? Math.max(...this.mockRechargeHistory.map(t => t.id)) + 1 : 1;
    const newTransaction = { ...transaction, id: newId, date: new Date().toISOString().split('T')[0], status: 'Completed' };
    this.mockRechargeHistory.push(newTransaction);
    console.log('Simulated recharge:', newTransaction);
    return of(newTransaction);
  }

  public getIconPath(iconName: string): string {
    return `assets/icons/${iconName}`;
  }
}
