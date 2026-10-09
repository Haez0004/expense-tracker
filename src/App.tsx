import { Expense, Currency } from "./types";
import { useState, useEffect } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Dashboard from "./pages/Dashboard"
import Transactions from "./pages/Transactions"
import Analytics from "./pages/Analytics"
import Budgets from "./pages/Budgets"
import Settings from "./pages/Settings"
import About from "./pages/About"

function App() {
  const [expenses, setExpenses] = useState<Expense[]>(() => {
    try {
      const saved = localStorage.getItem('expenses')
      return saved? JSON.parse(saved) : []
    } catch { return [] }
  })

  const [budgetLimit, setBudgetLimit] = useState<number>(() => {
  const saved = localStorage.getItem('budgetLimit')
  return saved? Number(saved) : 100000
})

useEffect(() => {
  localStorage.setItem('budgetLimit', String(budgetLimit))
}, [budgetLimit])

  const [currency, setCurrency] = useState<Currency>(() => {
    try {
      const saved = localStorage.getItem('currency')
      return (saved as Currency) || "NGN"
    } catch { return "NGN" }
  })
  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses))
  }, [expenses])

  useEffect(() => {
    localStorage.setItem('budgetLimit', String(budgetLimit))
  }, [budgetLimit])

  useEffect(() => {
    localStorage.setItem('currency', currency)
  }, [currency])
  const addTransaction = (t: Expense) => {
    setExpenses([t,...expenses])
  }

  const deleteTransaction = (idx: number) => {
    setExpenses(expenses.filter((_, i) => i!== idx))
  }

  const clearAll = (): void => {
    if (confirm("Clear all?")) setExpenses([])
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-black p-4 max-w-md mx-auto">
        <h1 className="text-white font-bold mb-4 text-center">Haez Expense Tracker</h1>
        <Navbar />
        
           <Routes>
          <Route path="/" element={<Dashboard expenses={expenses} setExpenses={setExpenses} budgetLimit={budgetLimit} currency={currency} />} />
          <Route path="/transactions" element={<Transactions transactions={expenses} setTransactions={setExpenses} currency={currency} />} />
          <Route path="/analytics" element={<Analytics expenses={expenses} currency={currency} />} />
          <Route path="/budgets" element={<Budgets expenses={expenses} budgetLimit={budgetLimit} currency={currency} />} />
          <Route path="/settings" element={<Settings onClear={clearAll} budgetLimit={budgetLimit} setBudgetLimit={setBudgetLimit} currency={currency} setCurrency={setCurrency} />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
