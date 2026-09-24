import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [expenses, setExpenses] = useState(() => {
    return JSON.parse(localStorage.getItem('expenses')) || []
  })
  const [text, setText] = useState('')
  const [amount, setAmount] = useState('')

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses))
  }, [expenses])

  const addExpense = (e) => {
    e.preventDefault()
    if(!text ||!amount) return
    setExpenses([...expenses, {id: Date.now(), text, amount: +amount}])
    setText(''); setAmount('')
  }

  const deleteExpense = (id) => {
    setExpenses(expenses.filter(exp => exp.id!== id))
  }
  const clearAll = () => {
  if(confirm("Delete all?")){
    setExpenses([])
  }
  }

  const balance = expenses.reduce((acc, cur) => acc + cur.amount, 0)
  const income = expenses.filter(e => e.amount > 0).reduce((a,c) => a + c.amount, 0)
  const exp = expenses.filter(e => e.amount < 0).reduce((a,c) => a + c.amount, 0)

  return (
    <div className="container">
      <h1>Haez Expense Tracker</h1>
      <div className="balance">
        <h3>Balance: ${balance}</h3>
        <div className="inc-exp">
          <span className="income">Income: ${income}</span>
          <span className="expense">Expense: ${Math.abs(exp)}</span>
        </div>
      </div>
      <form onSubmit={addExpense}>
        <input value={text} onChange={e=>setText(e.target.value)} placeholder="e.g. Salary or Garri" />
        <input type="number" value={amount} onChange={e=>setAmount(e.target.value)} placeholder="Amount: -100 expense, 500 income" />
        <button>Add Transaction</button>
      </form>
      <ul>
        {expenses.map(ex => (
          <li key={ex.id} className={ex.amount < 0? 'neg' : 'pos'}>
            {ex.text} <span>${ex.amount}</span>
            <button onClick={()=>deleteExpense(ex.id)}>x</button>
          </li>
        ))}
      </ul>
      <button onClick={clearAll} style={{width:'100%', marginTop:'20px', background:'#eee', padding:'12px', borderRadius:'8px', border:'none'}}>Clear All</button>
    </div>
  )
}
export default App
