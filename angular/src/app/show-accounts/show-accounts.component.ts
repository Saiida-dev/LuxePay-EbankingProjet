import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../Services/user-service.service';
import { AccountDTO } from '../models/account-dto';
import { JwtDto } from '../models/jwt-dto';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-show-accounts',
  templateUrl: './show-accounts.component.html',
  styleUrls: ['./show-accounts.component.css']
})
export class ShowAccountsComponent implements OnInit {

  accounts: AccountDTO[] = [];

  constructor(private service: UserServiceService) { }

  ngOnInit(): void {
    this._get_accounts();
  }

  _get_accounts(): void {
    const storedJwtData = localStorage.getItem('jwtData');
    if (storedJwtData) {
      const jwtData: JwtDto = JSON.parse(storedJwtData);
      const userId = jwtData.user_id;
      this.service.get_all_accounts(userId).subscribe(data => {
        this.accounts = data;
      });
    }
  }

  drop(event: any): void {
    moveItemInArray(this.accounts, event.previousIndex, event.currentIndex);
  }
}
