import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react'

export type Expense = {
  id: string
  title: string
  amount: number
  category: string
  date: string
}

type State = {
  expenses: Expense[]
  budgetLimit: number
  currency: string
}

type Action =
  | { type: 'ADD_EXPENSE'; payload: Expense }
  | { type: 'DELETE_EXPENSE'; payload: string }
  | { type: 'SET_BUDGET'; payload: number }
  | { type: 'SET_CURRENCY'; payload: string }
  | { type: 'CLEAR_ALL' }
  | { type: 'HYDRATE'; payload: State }

const initialState: State = {
  expenses: [],
  budgetLimit: 200000,
  currency: 'NGN'
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD_EXPENSE':
      return {...state, expenses: [action.payload,...state.expenses] }
    case 'DELETE_EXPENSE':
      return {...state, expenses: state.expenses.filter(e => e.id!== action.payload) }
    case 'SET_BUDGET':
      return {...state, budgetLimit: action.payload }
    case 'SET_CURRENCY':
      return {...state, currency: action.payload }
    case 'CLEAR_ALL':
      return {...initialState, budgetLimit: state.budgetLimit, currency: state.currency, expenses: [] }
    case 'HYDRATE':
      return action.payload
    default:
      return state
  }
}

type ContextType = State & {
  addExpense: (e: Expense) => void
  deleteExpense: (id: string) => void
  setBudgetLimit: (n: number) => void
  setCurrency: (c: string) => void
  clearAll: () => void
}

const ExpenseContext = createContext<ContextType | undefined>(undefined)

export function ExpenseProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  // Load from localStorage once
  useEffect(() => {
    try {
      const saved = localStorage.getItem('expense-tracker-v2')
      if (saved) {
        const parsed = JSON.parse(saved)
        dispatch({ type: 'HYDRATE', payload: parsed })
      }
    } catch {}
  }, [])

  // Save on every change
  useEffect(() => {
    localStorage.setItem('expense-tracker-v2', JSON.stringify(state))
  }, [state])

  const addExpense = (e: Expense) => dispatch({ type: 'ADD_EXPENSE', payload: e })
  const deleteExpense = (id: string) => dispatch({ type: 'DELETE_EXPENSE', payload: id })
  const setBudgetLimit = (n: number) => dispatch({ type: 'SET_BUDGET', payload: n })
  const setCurrency = (c: string) => dispatch({ type: 'SET_CURRENCY', payload: c })
  const clearAll = () => dispatch({ type: 'CLEAR_ALL' })

  return (
    <ExpenseContext.Provider value={{...state, addExpense, deleteExpense, setBudgetLimit, setCurrency, clearAll }}>
      {children}
    </ExpenseContext.Provider>
  )
}

export function useExpenses() {
  const ctx = useContext(ExpenseContext)
  if (!ctx) throw new Error('useExpenses must be used within ExpenseProvider')
  return ctx
}
