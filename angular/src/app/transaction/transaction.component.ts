import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../Services/user-service.service';
import { Transaction } from '../models/account';
import { ActivatedRoute } from '@angular/router';
import { TransactionType } from '../enums/transaction-type';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  transactionsList!: Array<Transaction>;

  constructor(private service: UserServiceService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const accountId = params.get('id');
      console.log("-------- > > "+accountId);
      
      if (accountId) {
        this.getAllTransaction(+accountId);
      }
    });
  }

  getAllTransaction(id: number) {
    this.service.get_all_tarnsaction(id).subscribe(data => {
      this.transactionsList = data;
    });
  }

  getIconClass(transaction: Transaction): string {
    if (transaction.montant < 0) {
      if (transaction.description_transaction.toLowerCase().includes('netflix') || transaction.description_transaction.toLowerCase().includes('abonnement')) {
        return 'fas fa-film'; // For Netflix/Subscription
      } else if (transaction.description_transaction.toLowerCase().includes('achat')) {
        return 'fas fa-shopping-bag'; // For purchase
      } else {
        return 'fas fa-paper-plane'; // Default for outgoing (debit)
      }
    } else {
      if (transaction.description_transaction.toLowerCase().includes('salaire') || transaction.description_transaction.toLowerCase().includes('revenu')) {
        return 'fas fa-wallet'; // For salary/income
      } else {
        return 'fas fa-hand-holding-usd'; // Default for incoming (credit)
      }
    }
  }

  getIconWrapperClass(transaction: Transaction): string {
    if (transaction.montant < 0) {
      if (transaction.description_transaction.toLowerCase().includes('netflix') || transaction.description_transaction.toLowerCase().includes('abonnement')) {
        return 'service-payment-icon-wrapper'; // Yellow for service payments
      } else {
        return 'debit-icon-wrapper'; // Light red for debit
      }
    } else {
      return 'credit-icon-wrapper'; // Light green for credit
    }
  }

  getCategoryLabel(transaction: Transaction): string | null {
    if (transaction.type_transaction === TransactionType.debit) {
      if (transaction.description_transaction.toLowerCase().includes('netflix') || transaction.description_transaction.toLowerCase().includes('abonnement')) {
        return 'Abonnement';
      } else if (transaction.description_transaction.toLowerCase().includes('achat')) {
        return 'Achat';
      } else {
        return 'Dépense'; // General outgoing transaction
      }
    } else if (transaction.type_transaction === TransactionType.credit) {
      if (transaction.description_transaction.toLowerCase().includes('salaire') || transaction.description_transaction.toLowerCase().includes('revenu')) {
        return 'Salaire';
      } else {
        return 'Revenu'; // General incoming transaction
      }
    }
    return null;
  }
}
