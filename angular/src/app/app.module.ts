import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

// Routing
import { AppRoutingModule } from './app-routing.module';

// Angular Material (Legacy Modules)
import { MatLegacySnackBarModule as MatSnackBarModule } from '@angular/material/legacy-snack-bar';
import { MatLegacySliderModule as MatSliderModule } from '@angular/material/legacy-slider';

// Angular CDK
import { DragDropModule } from '@angular/cdk/drag-drop';

// Charts
import { NgChartsModule } from 'ng2-charts';

// Auth Interceptor
import { InterceptorAuth } from './Services/_auth_interceptor.service';

// Components
import { AppComponent } from './app.component';
import { CarteBancaireComponent } from './carte-bancaire/carte-bancaire.component';
import { AddUserComponent } from './signup/add-user.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { AccountComponent } from './account/account.component';
import { ShowAccountsComponent } from './show-accounts/show-accounts.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { ChoiceAccountComponent } from './choice-account/choice-account.component';
import { TransactionComponent } from './transaction/transaction.component';
import { BeneficierComponent } from './beneficier/beneficier.component';
import { AddTransactionComponent } from './add-transaction/add-transaction.component';
import { UpdateBeneficierComponent } from './update-beneficier/update-beneficier.component';
import { LogoutComponent } from './logout/logout.component';
import { CryptoWalletComponent } from './crypto-wallet/crypto-wallet.component';
import { BudgetComponent } from './budget/budget.component';
import { AiAssistantComponent } from './ai-assistant/ai-assistant.component';
import { SettingsComponent } from './settings/settings.component';
import { AccountSettingsComponent } from './settings/account-settings/account-settings.component';
import { CardSettingsComponent } from './settings/card-settings/card-settings.component';
import { AddCardComponent } from './add-card/add-card.component';
import { RechargeListComponent } from './recharge-list/recharge-list.component';
import { RechargePayComponent } from './recharge-pay/recharge-pay.component';
import { RechargeHistoryComponent } from './recharge-history/recharge-history.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { ReferralComponent } from './referral/referral.component';
import { RegisterComponent } from './register/register.component';
import { VerifyCodeComponent } from './verify-code/verify-code.component';

@NgModule({
  declarations: [
    AppComponent,
    CarteBancaireComponent,
    AddUserComponent,
    LoginComponent,
    HeaderComponent,
    AccountComponent,
    ShowAccountsComponent,
    DashboardComponent,
    HomeComponent,
    NavComponent,
    ChoiceAccountComponent,
    TransactionComponent,
    BeneficierComponent,
    AddTransactionComponent,
    UpdateBeneficierComponent,
    LogoutComponent,
    CryptoWalletComponent,
    BudgetComponent,
    AiAssistantComponent,
    SettingsComponent,
    AccountSettingsComponent,
    CardSettingsComponent,
    AddCardComponent,
    RechargeListComponent,
    RechargePayComponent,
    RechargeHistoryComponent,
    MyProfileComponent,
    ReferralComponent,
    RegisterComponent,
    VerifyCodeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule,
    MatSnackBarModule,
    MatSliderModule,
    DragDropModule,
    NgChartsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorAuth, multi: true }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
