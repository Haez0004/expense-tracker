import { useMemo } from 'react'
import type { Expense } from '../context/ExpenseContext'

export function useBudgetAlert(expenses: Expense[], budgetLimit: number) {
  const { total, percent, isOver } = useMemo(() => {
    const total = expenses.reduce((sum, e) => sum + e.amount, 0)
    const percent = budgetLimit > 0? (total / budgetLimit) * 100 : 0
    return { total, percent, isOver: total > budgetLimit }
  }, [expenses, budgetLimit])

  return { total, percent, isOver }
}
