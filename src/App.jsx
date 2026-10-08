import { useState, useEffect, useMemo } from 'react'
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
  const [expenses, setExpenses] = useState(() => {
    try {
      const saved = localStorage.getItem('expenses')
      return saved? JSON.parse(saved) : []
    } catch { return [] }
  })
  const [text, setText] = useState('')
  const [amount, setAmount] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [search, setSearch] = useState('')
  const [monthFilter, setMonthFilter] = useState('all')
  const [category] = useState('Food')
const [budgetLimit, setBudgetLimit] = useState(() => {
  const saved = localStorage.getItem('budgetLimit')
  return saved? Number(saved) : 100000
})

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses))
  }, [expenses])
useEffect(() => {
  localStorage.setItem('budgetLimit', budgetLimit)
}, [budgetLimit])

  const addTransaction = (t) => {
    // works with your Dashboard Add form
    setExpenses([t,...expenses])
  }

  const deleteTransaction = (idx) => {
    setExpenses(expenses.filter((_, i) => i!== idx))
  }

  const clearAll = () => {
    if(confirm("Clear all?")) setExpenses([])
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-black p-4 max-w-md mx-auto">
        <h1 className="text-white font-bold mb-4 text-center">Haez Expense Tracker</h1>
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard transactions={expenses} addTransaction={addTransaction} />} />
          <Route path="/transactions" element={<Transactions transactions={expenses} onDelete={deleteTransaction} />} />
          <Route path="/analytics" element={<Analytics transactions={expenses} />} />
          <Route path="/budgets" element={<Budgets transactions={expenses} budgetLimit={budgetLimit} />} />
          <Route path="/settings" element={<Settings onClear={clearAll} budgetLimit={budgetLimit} setBudgetLimit={setBudgetLimit} />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
