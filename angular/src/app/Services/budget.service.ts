import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { CategoryExpense, BudgetGoal } from '../models/budget.model';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  private categoryExpensesSubject = new BehaviorSubject<CategoryExpense[]>([
    { id: '1', name: 'Groceries', allocatedBudget: 500, currentSpending: 450 },
    { id: '2', name: 'Utilities', allocatedBudget: 200, currentSpending: 180 },
    { id: '3', name: 'Entertainment', allocatedBudget: 150, currentSpending: 160 },
    { id: '4', name: 'Transport', allocatedBudget: 100, currentSpending: 90 },
  ]);
  private budgetGoalsSubject = new BehaviorSubject<BudgetGoal[]>([
    { id: 'g1', name: 'New Car Down Payment', targetAmount: 5000, currentAmount: 3500, dueDate: new Date('2024-12-31') },
    { id: 'g2', name: 'Vacation Fund', targetAmount: 1500, currentAmount: 800, dueDate: new Date('2025-06-30') },
  ]);

  categoryExpenses$: Observable<CategoryExpense[]> = this.categoryExpensesSubject.asObservable();
  budgetGoals$: Observable<BudgetGoal[]> = this.budgetGoalsSubject.asObservable();

  constructor() { }

  getCategoryExpenses(): Observable<CategoryExpense[]> {
    return this.categoryExpenses$;
  }

  updateCategoryExpense(updatedExpense: CategoryExpense): Observable<CategoryExpense[]> {
    const currentExpenses = this.categoryExpensesSubject.getValue();
    const updatedExpenses = currentExpenses.map(expense =>
      expense.id === updatedExpense.id ? updatedExpense : expense
    );
    this.categoryExpensesSubject.next(updatedExpenses);
    return of(updatedExpenses);
  }

  getBudgetGoals(): Observable<BudgetGoal[]> {
    return this.budgetGoals$;
  }

  updateBudgetGoal(updatedGoal: BudgetGoal): Observable<BudgetGoal[]> {
    const currentGoals = this.budgetGoalsSubject.getValue();
    const updatedGoals = currentGoals.map(goal =>
      goal.id === updatedGoal.id ? updatedGoal : goal
    );
    this.budgetGoalsSubject.next(updatedGoals);
    return of(updatedGoals);
  }
} 