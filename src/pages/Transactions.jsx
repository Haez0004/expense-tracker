import { useState } from "react"

function Transactions({ transactions, setTransactions }) {
  const [search, setSearch] = useState("")
  const [month, setMonth] = useState("all")
  const [editingId, setEditingId] = useState(null)
  const [editText, setEditText] = useState("")
  const [editAmount, setEditAmount] = useState("")

  // filter
  const filtered = transactions.filter(t => {
    const matchSearch = t.text.toLowerCase().includes(search.toLowerCase())
    const tMonth = new Date(t.date || t.id).getMonth()
    const matchMonth = month === "all" || tMonth === parseInt(month)
    return matchSearch && matchMonth
  })

  const handleDelete = (id) => {
    setTransactions(transactions.filter(t => t.id !== id))
  }

  const startEdit = (t) => {
    setEditingId(t.id)
    setEditText(t.text)
    setEditAmount(t.amount)
  }

  const saveEdit = () => {
    setTransactions(transactions.map(t => 
      t.id === editingId ? { ...t, text: editText, amount: Number(editAmount) } : t
    ))
    setEditingId(null)
  }

  return (
    <div className="page">
      <h2>Transactions</h2>

      <div style={{display: "flex", gap: "10px", marginBottom: "15px"}}>
        <input 
          placeholder="Search..." 
          value={search} 
          onChange={e => setSearch(e.target.value)}
          style={{flex: 1, padding: "8px"}}
        />
        <select value={month} onChange={e => setMonth(e.target.value)} style={{padding: "8px"}}>
          <option value="all">All Months</option>
          <option value="0">Jan</option>
          <option value="1">Feb</option>
          <option value="2">Mar</option>
          <option value="3">Apr</option>
          <option value="4">May</option>
          <option value="5">Jun</option>
          <option value="6">Jul</option>
          <option value="7">Aug</option>
          <option value="8">Sep</option>
          <option value="9">Oct</option>
          <option value="10">Nov</option>
          <option value="11">Dec</option>
        </select>
      </div>

      {filtered.length === 0 ? <p>No transactions found</p> : null}

      {filtered.map(t => (
        <div key={t.id} style={{border: "1px solid #ddd", padding: "10px", marginBottom: "8px", display: "flex", justifyContent: "space-between"}}>
          {editingId === t.id ? (
            <>
              <input value={editText} onChange={e => setEditText(e.target.value)} />
              <input type="number" value={editAmount} onChange={e => setEditAmount(e.target.value)} style={{width: "80px"}}/>
              <button onClick={saveEdit}>Save</button>
              <button onClick={() => setEditingId(null)}>Cancel</button>
            </>
          ) : (
            <>
              <span>{t.text} - ₦{t.amount}</span>
              <div style={{display: "flex", gap: "5px"}}>
                <button onClick={() => startEdit(t)}>Edit</button>
                <button onClick={() => handleDelete(t.id)}>Delete</button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  )
}

export default Transactions
