import { useState, useEffect, useMemo } from 'react'
import './App.css'
import Balance from './components/Balance.jsx'
import TransactionForm from './components/TransactionForm.jsx'
import TransactionList from './components/TransactionList.jsx'

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

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses))
  }, [expenses])

  const addTransaction = (type) => {
    if(!text ||!amount) return
    let num = Number(amount)
    if(type === 'expense') num = -Math.abs(num)
    else num = Math.abs(num)

    if(editingId){
      setExpenses(expenses.map(e => e.id === editingId? {...e, text, amount: num, category} : e))
      setEditingId(null)
    } else {
      setExpenses([...expenses, {id: Date.now(), text, amount: num, category}])
    }
    setText(''); setAmount('')
  }

  const editTransaction = (id) => {
    const e = expenses.find(ex => ex.id === id)
    setText(e.text)
    setAmount(Math.abs(e.amount).toString())
    setEditingId(id)
  }

  const deleteExpense = (id) => {
    setExpenses(expenses.filter(e => e.id!== id))
  }

  const clearAll = () => {
    if(confirm("Delete all?")){
      setExpenses([])
    }
  }

  const balance = expenses.reduce((acc, cur) => acc + cur.amount, 0)
  const income = expenses.filter(e => e.amount > 0).reduce((acc, cur) => acc + cur.amount, 0)
  const expense = expenses.filter(e => e.amount < 0).reduce((acc, cur) => acc + cur.amount, 0)

  const filteredExpenses = useMemo(() => {
    return expenses.filter(ex => {
      const matchSearch = ex.text.toLowerCase().includes(search.toLowerCase())
      const exMonth = new Date(ex.id).getMonth()
      const matchMonth = monthFilter === 'all' || exMonth == monthFilter
      return matchSearch && matchMonth
    })
  }, [expenses, search, monthFilter])

  return (
    <div className="container">
      <h1>Haez Expense Tracker</h1>

      <Balance balance={balance} income={income} expense={expense} />

      <TransactionForm
        text={text} setText={setText}
        amount={amount} setAmount={setAmount}
        onAdd={addTransaction}
        editingId={editingId}
      />

      <div style={{display:'flex', gap:'10px', marginTop:'15px', marginBottom:'12px'}}>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search..." style={{flex:2, padding:'10px', borderRadius:'8px', border:'1px solid #444'}} />
        <select value={monthFilter} onChange={e=>setMonthFilter(e.target.value)} style={{flex:1, padding:'10px', borderRadius:'8px'}}>
          <option value="all">All Months</option>
          <option value="0">Jan</option><option value="1">Feb</option>
          <option value="2">Mar</option><option value="3">Apr</option>
          <option value="4">May</option><option value="5">Jun</option>
          <option value="6">Jul</option><option value="7">Aug</option>
          <option value="8">Sep</option><option value="9">Oct</option>
          <option value="10">Nov</option><option value="11">Dec</option>
        </select>
      </div>

      <TransactionList expenses={filteredExpenses} onEdit={editTransaction} onDelete={deleteExpense} />

      <button onClick={clearAll} style={{width:'100%', marginTop:'20px', background:'#ff0000', padding:'12px', borderRadius:'8px', border:'none'}}>Clear All</button>
    </div>
  )
}
export default App
