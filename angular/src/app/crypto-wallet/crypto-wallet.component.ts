import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { RechargeService } from '../Services/recharge.service';

interface CryptoAsset {
  symbol: string;
  name: string;
  currentPrice: number;
  balance: number;
  usdValue: number;
  change24h: number; // percentage change
  changeDirection: 'up' | 'down' | 'none';
}

interface TradingTransaction {
  id: number;
  type: 'BUY' | 'SELL';
  crypto: string;
  date: string;
  amount: number;
  usdPrice: number;
}

@Component({
  selector: 'app-crypto-wallet',
  templateUrl: './crypto-wallet.component.html',
  styleUrls: ['./crypto-wallet.component.css']
})
export class CryptoWalletComponent implements OnInit, OnDestroy {
  cryptoData: Record<string, CryptoAsset> = {
    BTC: {
      symbol: 'BTC',
      name: 'Bitcoin',
      currentPrice: 60000,
      balance: 0.5,
      usdValue: 0.5 * 60000,
      change24h: 2.5,
      changeDirection: 'up',
    },
    ETH: {
      symbol: 'ETH',
      name: 'Ethereum',
      currentPrice: 3000,
      balance: 5.0,
      usdValue: 5.0 * 3000,
      change24h: -1.2,
      changeDirection: 'down',
    },
  };

  activeMode: 'buy' | 'sell' = 'buy';
  selectedCrypto: 'BTC' | 'ETH' = 'BTC';
  tradingForm!: FormGroup;
  estimatedPrice: number = 0;
  tradingHistory: TradingTransaction[] = [
    { id: 1, type: 'BUY', crypto: 'BTC', date: '2024-05-20', amount: 0.01, usdPrice: 620 }
  ];

  private priceUpdateInterval!: any;
  private formSubscription!: Subscription;

  constructor(private fb: FormBuilder, public rechargeService: RechargeService) { }

  ngOnInit(): void {
    this.initTradingForm();
    this.startPriceUpdates();

    this.formSubscription = this.tradingForm.valueChanges.subscribe(() => {
      this.calculateEstimatedPrice();
    });
  }

  ngOnDestroy(): void {
    if (this.priceUpdateInterval) {
      clearInterval(this.priceUpdateInterval);
    }
    if (this.formSubscription) {
      this.formSubscription.unsubscribe();
    }
  }

  initTradingForm(): void {
    this.tradingForm = this.fb.group({
      amount: ['', [Validators.required, Validators.min(0.000001)]],
    });
  }

  startPriceUpdates(): void {
    this.priceUpdateInterval = setInterval(() => {
      for (const crypto in this.cryptoData) {
        if (this.cryptoData.hasOwnProperty(crypto)) {
          const asset = this.cryptoData[crypto];
          const priceChange = (Math.random() * 100 - 50) / 1000; // Simulate small price fluctuations
          const newPrice = asset.currentPrice * (1 + priceChange);
          const newChange24h = priceChange * 100; // Convert to percentage

          asset.currentPrice = parseFloat(newPrice.toFixed(2));
          asset.change24h = parseFloat(newChange24h.toFixed(2));
          asset.usdValue = parseFloat((asset.balance * asset.currentPrice).toFixed(2));
          asset.changeDirection = newChange24h >= 0 ? 'up' : 'down';
        }
      }
      this.calculateEstimatedPrice(); // Recalculate estimated price on price update
    }, 5000); // Update every 5 seconds
  }

  selectMode(mode: 'buy' | 'sell'): void {
    this.activeMode = mode;
    this.calculateEstimatedPrice();
  }

  selectCrypto(crypto: 'BTC' | 'ETH'): void {
    this.selectedCrypto = crypto;
    this.calculateEstimatedPrice();
  }

  calculateEstimatedPrice(): void {
    const amount = this.tradingForm.get('amount')?.value;
    if (amount && this.selectedCrypto) {
      this.estimatedPrice = parseFloat((amount * this.cryptoData[this.selectedCrypto].currentPrice).toFixed(2));
    } else {
      this.estimatedPrice = 0;
    }
  }

  performTransaction(): void {
    if (this.tradingForm.valid && this.selectedCrypto && this.estimatedPrice > 0) {
      const amount = this.tradingForm.get('amount')?.value;
      const currentCryptoData = this.cryptoData[this.selectedCrypto];

      const newTransaction: TradingTransaction = {
        id: this.tradingHistory.length + 1,
        type: this.activeMode.toUpperCase() as 'BUY' | 'SELL',
        crypto: this.selectedCrypto,
        date: new Date().toISOString().split('T')[0],
        amount: amount,
        usdPrice: this.estimatedPrice,
      };

      if (this.activeMode === 'buy') {
        currentCryptoData.balance += amount;
        currentCryptoData.usdValue = parseFloat((currentCryptoData.balance * currentCryptoData.currentPrice).toFixed(2));
      } else if (this.activeMode === 'sell') {
        if (currentCryptoData.balance >= amount) {
          currentCryptoData.balance -= amount;
          currentCryptoData.usdValue = parseFloat((currentCryptoData.balance * currentCryptoData.currentPrice).toFixed(2));
        } else {
          alert('Insufficient balance to sell.');
          return;
        }
      }

      this.tradingHistory.unshift(newTransaction); // Add to the beginning of the history
      this.tradingForm.reset();
      this.estimatedPrice = 0;
      alert(`${this.activeMode.toUpperCase()} ${amount} ${this.selectedCrypto} successful!`);
    } else {
      alert('Please enter a valid amount and ensure the form is valid.');
    }
  }
}
