import { useState } from "react"

function Transactions({ transactions, setTransactions }) {
  const [search, setSearch] = useState("")
  const [month, setMonth] = useState("all")
  const [editingId, setEditingId] = useState(null)
  const [editText, setEditText] = useState("")
  const [editAmount, setEditAmount] = useState("")

  const filtered = transactions.filter(t => {
    const matchSearch = t.text.toLowerCase().includes(search.toLowerCase())
    const d = new Date(t.date || Date.now())
    const matchMonth = month === "all" || d.getMonth() === parseInt(month)
    return matchSearch && matchMonth
  })

  const handleDelete = (id) => {
    if(confirm("Delete this?")){
      setTransactions(transactions.filter(t => t.id !== id))
    }
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
    <div style={{padding: "10px"}}>
      <h3>Transactions</h3>

      <div style={{display: "flex", gap: "10px", marginBottom: "15px"}}>
        <input 
          placeholder="Search..." 
          value={search} 
          onChange={e => setSearch(e.target.value)}
          style={{flex: 1, padding: "10px", borderRadius: "8px", background: "#222", color: "white", border: "1px solid #444"}}
        />
        <select value={month} onChange={e => setMonth(e.target.value)} style={{padding: "10px", borderRadius: "8px", background: "#222", color: "white", border: "1px solid #444"}}>
          <option value="all">All Months</option>
          <option value="0">Jan</option><option value="1">Feb</option><option value="2">Mar</option>
          <option value="3">Apr</option><option value="4">May</option><option value="5">Jun</option>
          <option value="6">Jul</option><option value="7">Aug</option><option value="8">Sep</option>
          <option value="9">Oct</option><option value="10">Nov</option><option value="11">Dec</option>
        </select>
      </div>

      {filtered.map(t => (
        <div key={t.id} style={{border: "1px solid #444", borderRadius: "10px", padding: "12px", marginBottom: "10px", background: "#111"}}>
          {editingId === t.id ? (
            <div style={{display: "flex", flexDirection: "column", gap: "8px"}}>
              <input value={editText} onChange={e => setEditText(e.target.value)} style={{padding: "8px"}} />
              <input type="number" value={editAmount} onChange={e => setEditAmount(e.target.value)} style={{padding: "8px"}} />
              <div style={{display: "flex", gap: "8px"}}>
                <button onClick={saveEdit} style={{flex: 1, padding: "8px", background: "#4CAF50", color: "white", border: "none", borderRadius: "6px"}}>Save</button>
                <button onClick={() => setEditingId(null)} style={{flex: 1, padding: "8px", background: "#555", color: "white", border: "none", borderRadius: "6px"}}>Cancel</button>
              </div>
            </div>
          ) : (
            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
              <span style={{flex: 1}}>{t.text} - ₦{t.amount}</span>
              <div style={{display: "flex", gap: "12px"}}>
                <button onClick={() => startEdit(t)} style={{background: "#2196F3", color: "white", border: "none", padding: "6px 12px", borderRadius: "6px"}}>Edit</button>
                <button onClick={() => handleDelete(t.id)} style={{background: "#f44336", color: "white", border: "none", padding: "6px 12px", borderRadius: "6px"}}>Delete</button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default Transactions
