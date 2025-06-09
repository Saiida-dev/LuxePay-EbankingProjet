import { Time } from "@angular/common";
import { CarteStatus } from "../enums/carte-status";
import { CarteType } from "../enums/carte-type";
import { CompteType } from "../enums/compte-type";
import { TransactionType } from "../enums/transaction-type";
import { User } from "./user";

export interface Account {
  id: number;
  accountNumber: string;
  type: CompteType;
  solde: number;
  date_creation: string; 
  status: boolean;
  user : User;
  listOfBeneficier: Beneficier[]; 
  listOfTransactions: Transaction[]; 
  listOfCarte: Carte[]; 
}

export interface Beneficier {
  id: number;
  username: string;
  bank: string;
  account_number: string;
  compte: Account;
}

export interface Transaction {
  id: number;
  transactionDate: string;
  transactionTimer: string;
  montant: number;
  type_transaction: TransactionType;
  description_transaction: string;
  bank_transaction: string;
  compte: Account;
  beneficier: Beneficier;
}

export interface Carte {
  id: number;
  carte_numero: string;
  date_expiration: string;
  carte_type: CarteType;
  status: CarteStatus;
  compte: Account;
}
