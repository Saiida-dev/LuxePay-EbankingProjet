import { Component, OnInit, OnDestroy } from '@angular/core';
import { BudgetService } from '../Services/budget.service';
import { CategoryExpense, BudgetGoal } from '../models/budget.model';
import { Chart, ChartData, ChartOptions, ChartType, TooltipItem } from 'chart.js';
import { Subscription } from 'rxjs';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css']
})
export class BudgetComponent implements OnInit, OnDestroy {
  categoryExpenses: CategoryExpense[] = [];
  budgetGoals: BudgetGoal[] = [];
  private subscriptions: Subscription = new Subscription();

  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: (context: TooltipItem<'pie'>) => {
            const label = context.label || '';
            const value = context.raw as number;
            const dataset = context.chart.data.datasets[context.datasetIndex];
            const total = (dataset.data as number[]).reduce((acc: number, current: number) => acc + current, 0);
            const percentage = ((value / total) * 100).toFixed(2);
            return `${label}: ${value}€ (${percentage}%)`;
          }
        }
      }
    }
  };

  public pieChartLabels: string[] = [];
  public pieChartData: ChartData<'pie', number[], string> = {
    labels: [],
    datasets: [{ data: [] }]
  };
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  constructor(
    private budgetService: BudgetService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(this.budgetService.categoryExpenses$.subscribe(expenses => {
      this.categoryExpenses = expenses;
      this.updateChartData();
      this.checkBudgetOverruns();
    }));

    this.subscriptions.add(this.budgetService.budgetGoals$.subscribe(goals => {
      this.budgetGoals = goals;
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  updateChartData(): void {
    this.pieChartLabels = this.categoryExpenses.map(expense => expense.name);
    this.pieChartData = {
      labels: this.pieChartLabels,
      datasets: [{
        data: this.categoryExpenses.map(expense => expense.currentSpending),
        backgroundColor: this.generateColors(this.categoryExpenses.length)
      }]
    };
  }

  generateColors(numColors: number): string[] {
    const colors: string[] = [];
    for (let i = 0; i < numColors; i++) {
      colors.push(`#${Math.floor(Math.random() * 16777215).toString(16)}`);
    }
    return colors;
  }

  checkBudgetOverruns(): void {
    this.categoryExpenses.forEach(expense => {
      if (expense.allocatedBudget > 0 && expense.currentSpending > expense.allocatedBudget * 1.1) {
        this.snackBar.open(`Warning: ${expense.name} spending exceeds 110% of allocated budget!`, 'Dismiss', {
          duration: 5000,
          panelClass: ['snackbar-warning']
        });
      } else if (expense.allocatedBudget > 0 && expense.currentSpending > expense.allocatedBudget) {
        this.snackBar.open(`Alert: ${expense.name} spending exceeds allocated budget!`, 'Dismiss', {
          duration: 5000,
          panelClass: ['snackbar-alert']
        });
      }
    });
  }

  calculateProgress(current: number, target: number): number {
    return target > 0 ? (current / target) * 100 : 0;
  }
}
