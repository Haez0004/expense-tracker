export default function TransactionList({ expenses, onEdit, onDelete }) {
  return (
    <ul className="mt-4 space-y-2">
      {expenses.map(ex => (
        <li key={ex.id} className={`${ex.amount < 0 ? 'bg-red-900/30 border-red-500' : 'bg-green-900/30 border-green-500'} border rounded-xl p-3 flex justify-between`}>
          <span>{ex.text} — {ex.amount}</span>
          <div className="flex gap-2">
            <button onClick={()=>onEdit(ex.id)}>Edit</button>
            <button onClick={()=>onDelete(ex.id)} className="text-red-400">x</button>
          </div>
        </li>
      ))}
    </ul>
  )
}
