export interface CategoryExpense {
  id: string;
  name: string;
  allocatedBudget: number;
  currentSpending: number;
}

export interface BudgetGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  dueDate: Date;
} 