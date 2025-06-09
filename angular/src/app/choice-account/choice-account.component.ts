import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../Services/user-service.service';
import { Account } from '../models/account';
import { JwtDto } from '../models/jwt-dto';
import { AccountDTO } from '../models/account-dto';

@Component({
  selector: 'app-choice-account',
  templateUrl: './choice-account.component.html',
  styleUrls: ['./choice-account.component.css']
})
export class ChoiceAccountComponent implements OnInit {

  constructor(private service : UserServiceService) { }
    account_list !: Array<AccountDTO>;

  ngOnInit(): void {
    this.onSubmit();
  }

  onSubmit(){
    const storedJwtData = localStorage.getItem('jwtData');
        if (storedJwtData) {
            const jwtData: JwtDto = JSON.parse(storedJwtData);
            const user_id = jwtData.user_id;
      this.service.get_all_accounts(user_id).subscribe(data => {
        this.account_list = data
      })
  }else{
      console.log("you havent a user id !");
  }

  }}
