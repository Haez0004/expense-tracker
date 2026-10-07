export default function TransactionForm({ text, setText, amount, setAmount, onAdd, editingId }) {
  return (
    <div className="mt-4 space-y-3">
      <input value={text} onChange={e=>setText(e.target.value)} placeholder="e.g. Garri"
        className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-3 outline-none" />
      <input type="number" value={amount} onChange={e=>setAmount(e.target.value)} placeholder="Amount"
        className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-3 outline-none" />
      <div className="flex gap-2">
        <button onClick={()=>onAdd('income')} className="flex-1 bg-green-500 p-3 rounded-xl font-bold">
          {editingId ? 'Update as Income' : 'Add Income'}
        </button>
        <button onClick={()=>onAdd('expense')} className="flex-1 bg-red-500 p-3 rounded-xl font-bold">
          {editingId ? 'Update as Expense' : 'Add Expense'}
        </button>
      </div>
    </div>
  )
}
