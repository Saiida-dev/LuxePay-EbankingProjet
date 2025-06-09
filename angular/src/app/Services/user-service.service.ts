import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../models/user';
import { JwtDto } from '../models/jwt-dto';
import { Account, Beneficier, Transaction } from '../models/account';
import { AccountDTO } from '../models/account-dto';
import { Card } from '../models/card';

import { CompteType } from '../enums/compte-type';
import { CarteType } from '../enums/carte-type';
import { CarteStatus } from '../enums/carte-status';
import { TransactionType } from '../enums/transaction-type';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  constructor() {}

  public signup(user: User): Observable<User> {
    return of(user);
  }

  public login(userDto: User): Observable<JwtDto> {
    return of({ token: 'mock-token', user_id: 1 });
  }

  public get_username(username: string): Observable<JwtDto> {
    return of({ token: 'mock-token', user_id: 1 });
  }

  public add_account(user_id: number, account: Account): Observable<Account> {
    return of(account);
  }

  public get_all_accounts(id: number): Observable<AccountDTO[]> {
    return of([
      {
        id: 1,
        accountNumber: 'FR761234567890',
        type: CompteType.courant,
        solde: 3200,
        date_creation: '2024-01-01',
        status: true,
        id_user: id
      },
      {
        id: 2,
        accountNumber: 'FR761234567891',
        type: CompteType.epargne,
        solde: 5800,
        date_creation: '2023-12-01',
        status: true,
        id_user: id
      }
    ]);
  }

  public get_account(id: number): Observable<AccountDTO> {
    return of({
      id,
      accountNumber: 'FR761234567890',
      type: CompteType.courant,
      solde: 3200,
      date_creation: '2024-01-01',
      status: true,
      id_user: 1
    });
  }

  public getfirstCarte(id: number): Observable<Card> {
    return of({
      id_carte: 1,
      numero_carte: '1111-2222-3333-4444',
      expiration_date: '2026-12-01',
      carte_type: CarteType.visa,
      status: true,
      id_compte: id
    });
  }

  public get_all_Cartes(id: number): Observable<Card[]> {
    return of([
      {
        id_carte: 1,
        numero_carte: '1111-2222-3333-4444',
        expiration_date: '2026-12-01',
        carte_type: CarteType.visa,
        status: true,
        id_compte: id
      },
      {
        id_carte: 2,
        numero_carte: '5555-6666-7777-8888',
        expiration_date: '2025-07-01',
        carte_type: CarteType.masterCard,
        status: false,
        id_compte: id
      }
    ]);
  }

  public get_all_tarnsaction(id: number): Observable<Transaction[]> {
    return of([
      {
        id: 1,
        transactionDate: '2024-04-01',
        transactionTimer: '12:00',
        montant: 100,
        type_transaction: TransactionType.debit,
        description_transaction: 'Paiement Netflix',
        bank_transaction: 'Netflix Bank',
        compte: {} as Account,
        beneficier: {} as Beneficier
      },
      {
        id: 2,
        transactionDate: '2024-04-02',
        transactionTimer: '14:30',
        montant: 500,
        type_transaction: TransactionType.credit,
        description_transaction: 'Salaire',
        bank_transaction: 'Entreprise X',
        compte: {} as Account,
        beneficier: {} as Beneficier
      }
    ]);
  }

  public get_all_beneficiers(id: number): Observable<Beneficier[]> {
    return of([
      {
        id: 1,
        username: 'fatima',
        bank: 'Attijariwafa',
        account_number: 'FR761111111111',
        compte: {} as Account
      },
      {
        id: 2,
        username: 'omar',
        bank: 'BMCE',
        account_number: 'FR762222222222',
        compte: {} as Account
      }
    ]);
  }

  public add_transaction(transaction: Transaction, accountId: number): Observable<Transaction> {
    return of(transaction);
  }

  public get_Beneficier(id: number): Observable<Beneficier> {
    return of({
      id,
      username: 'fatima',
      bank: 'CIH Bank',
      account_number: 'FR761234567000',
      compte: {} as Account
    });
  }

  public update_Beneficier(id: number, beneficier: Beneficier): Observable<Beneficier> {
    return of(beneficier);
  }

  public delete_Beneficier(id: number): Observable<void> {
    return of(void 0);
  }

  // New methods for card actions
  public updateCardStatus(cardId: number, status: string): Observable<any> {
    console.log(`Simulating update for card ${cardId} to status: ${status}`);
    return of({ success: true, cardId, status });
  }

  public updateCardPin(cardId: number, newPin: string): Observable<any> {
    console.log(`Simulating PIN update for card ${cardId} to: ${newPin}`);
    return of({ success: true, cardId, newPin });
  }

  public orderNewPhysicalCard(cardId: number): Observable<any> {
    console.log(`Simulating order for new physical card for card: ${cardId}`);
    return of({ success: true, cardId, message: 'Physical card ordered' });
  }

  public addCard(card: Card): Observable<Card> {
    console.log('Simulating add card:', card);
    // In a real application, you would make an HTTP request here
    // For now, we return the card as if it was successfully added
    return of({ ...card, id_carte: Math.floor(Math.random() * 1000) + 100 }); // Assign a mock ID
  }
}
