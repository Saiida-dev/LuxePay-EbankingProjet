import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChoiceAccountComponent } from './choice-account/choice-account.component';
import { UpdateBeneficierComponent } from './update-beneficier/update-beneficier.component';
import { CarteBancaireComponent } from './carte-bancaire/carte-bancaire.component';
import { TransactionComponent} from './transaction/transaction.component';
import { AccountComponent } from './account/account.component';
import { AddTransactionComponent } from './add-transaction/add-transaction.component';
import { SettingsComponent } from './settings/settings.component';
import { AccountSettingsComponent } from './settings/account-settings/account-settings.component';
import { CardSettingsComponent } from './settings/card-settings/card-settings.component';
import { AddCardComponent } from './add-card/add-card.component';
import { CryptoWalletComponent } from './crypto-wallet/crypto-wallet.component';
import { RechargeListComponent } from './recharge-list/recharge-list.component';
import { RechargePayComponent } from './recharge-pay/recharge-pay.component';
import { RechargeHistoryComponent } from './recharge-history/recharge-history.component';
import { AiAssistantComponent } from './ai-assistant/ai-assistant.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { ReferralComponent } from './referral/referral.component';
import { BudgetComponent } from './budget/budget.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { VerifyCodeComponent } from './verify-code/verify-code.component'


const routes: Routes = [
  {path:'' , redirectTo: 'home', pathMatch: 'full'},
  {path:'login' , component:LoginComponent},
  {path:'register' , component:RegisterComponent},
  {path:'home' , component:HomeComponent},
  {path:'choice' , component:ChoiceAccountComponent},
  {path:'dashboard/:id' , component:DashboardComponent},
  {path:'beneficier/:idB' , component:UpdateBeneficierComponent},
  { path: 'cartes/:id', component: CarteBancaireComponent },
  { path: 'transactions/:id', component: TransactionComponent },
  { path: 'add-transaction/:id', component: AddTransactionComponent },
  { path: 'add-card/:id', component: AddCardComponent },
  { path: 'crypto-wallet', component: CryptoWalletComponent },
  { path: 'recharge-list/:id', component: RechargeListComponent },
  { path: 'recharge-pay/:accountId/:serviceId', component: RechargePayComponent },
  { path: 'recharge-history/:id', component: RechargeHistoryComponent },
  { path: 'ai-assistant', component: AiAssistantComponent },
  { path: 'profile', component: MyProfileComponent },
  { path: 'referral', component: ReferralComponent },
  { path: 'budget', component: BudgetComponent },
  { path: 'account-setting/:id', component: AccountComponent },
   { path: 'verify-code', component: VerifyCodeComponent }, 
 {

    path: 'settings', 
    component: SettingsComponent, 
    children: [
      { path: 'account', component: AccountSettingsComponent },
      { path: 'cards', component: CardSettingsComponent },
      { path: '', redirectTo: 'account', pathMatch: 'full' } // Default child route
      
    ]
  },
  {path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
