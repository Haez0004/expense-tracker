import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [expenses, setExpenses] = useState(() => {
    return JSON.parse(localStorage.getItem('expenses')) || []
  })
  const [text, setText] = useState('')
  const [amount, setAmount] = useState('')
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses))
  }, [expenses])

  const addTransaction = (type) => {
    if(!text ||!amount) return
    let num = Number(amount)
    if(type === 'expense') num = -Math.abs(num)
    else num = Math.abs(num)

    if(editingId){
      setExpenses(expenses.map(e => e.id === editingId? {...e, text, amount: num} : e));
      setEditingId(null);
    } else {
      setExpenses([...expenses, {id: Date.now(), text, amount: num}]);
    }
    setText(''); setAmount('');
  }

  const editTransaction = (id) => {
    const e = expenses.find(ex => ex.id === id);
    setText(e.text);
    setAmount(Math.abs(e.amount).toString());
    setEditingId(id);
  }

  const deleteExpense = (id) => {
    setExpenses(expenses.filter(e => e.id!== id))
  }

  const balance = expenses.reduce((acc, cur) => acc + cur.amount, 0)
  const income = expenses.filter(e => e.amount > 0).reduce((acc, cur) => acc + cur.amount, 0)
  const exp = expenses.filter(e => e.amount < 0).reduce((acc, cur) => acc + cur.amount, 0)

  return (
    <div className="container">
      <h1>Haez Expense Tracker</h1>
      <div className="balance"><h3>Balance: {balance}</h3></div>
      <div className="inc-exp">
        <span className="income">Income: {income}</span>
        <span className="expense">Expense: {Math.abs(exp)}</span>
      </div>
      <div>
        <input value={text} onChange={e=>setText(e.target.value)} placeholder="e.g. Garri" />
        <input type="number" value={amount} onChange={e=>setAmount(e.target.value)} placeholder="Amount" />
        <div style={{display:'flex', gap:'10px', marginTop:'10px'}}>
          <button onClick={()=>addTransaction('income')} style={{flex:1, background:'#2ecc71', color:'white'}}>{editingId? 'Update as Income' : 'Add Income'}</button>
          <button onClick={()=>addTransaction('expense')} style={{flex:1, background:'#ef4444', color:'white'}}>{editingId? 'Update as Expense' : 'Add Expense'}</button>
        </div>
      </div>
      <ul>
        {expenses.map(ex => (
          <li key={ex.id} className={ex.amount < 0? 'negative' : 'positive'}>
            {ex.text} <span>{ex.amount}</span>
            <button onClick={()=>editTransaction(ex.id)} style={{marginLeft:'10px'}}>Edit</button>
            <button onClick={()=>deleteExpense(ex.id)} style={{marginLeft:'5px'}}>x</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
export default App
