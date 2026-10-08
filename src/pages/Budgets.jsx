export default function Budgets({ transactions, budgetLimit }) {
  const expense = transactions.filter(t=> Number(t.amount)<0).reduce((a,c)=>a+Math.abs(Number(c.amount)),0);
  const limit = budgetLimit || 100000;
  const pct = Math.min(100, Math.round(expense/limit*100));
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
      <h2 className="text-white font-bold">Monthly Budget</h2>
      <p className="text-zinc-400 text-sm mt-1">Limit: ₦{limit.toLocaleString()}</p>
      <div className="h-3 bg-zinc-800 rounded-full mt-3"><div className={`h-3 rounded-full ${pct>80?'bg-red-500': pct>50?'bg-yellow-500':'bg-green-500'}`} style={{width:`${pct}%`}} /></div>
      <div className="flex justify-between mt-2 text-xs text-zinc-400"><span>Spent ₦{expense.toLocaleString()}</span><span className={pct>80?'text-red-400':'text-green-400'}>{pct}% used</span></div>
      {pct>80 && <p className="text-red-400 text-xs mt-3">⚠️ You are over 80% of your budget!</p>}
    </div>
  );
}
