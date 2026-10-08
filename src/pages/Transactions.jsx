export default function Transactions({ transactions, onDelete }) {
  if(!transactions.length) return <div className="bg-zinc-900 border border-dashed border-zinc-700 rounded-2xl p-8 text-center text-zinc-400">No transactions yet</div>;
  return (
    <div className="space-y-2">
      {transactions.map((t,i)=>(
        <div key={t.id||i} className="flex justify-between items-center bg-zinc-900 border border-zinc-800 p-3 rounded-xl text-white">
          <span>{t.text} - ₦{Math.abs(Number(t.amount))}</span>
          <button onClick={()=>onDelete(i)} className="text-red-400 text-xs">Delete</button>
        </div>
      ))}
    </div>
  );
}
