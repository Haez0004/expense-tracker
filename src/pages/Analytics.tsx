import { Expense, Currency, CURRENCIES } from "../types";

type Props = {
  expenses: Expense[];
  currency: Currency;
}

export default function Analytics({ expenses, currency }: Props) {
  const symbol = CURRENCIES[currency]?.symbol || "$";
  const transactions = expenses; // keep your old logic

  const income = transactions.filter(t=> Number(t.amount)>0).reduce((a,c)=>a+Number(c.amount),0);
  const expense = transactions.filter(t=> Number(t.amount)<0).reduce((a,c)=>a+Math.abs(Number(c.amount)),0);
  const total = income+expense || 1;

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
      <h2 className="text-white font-bold mb-4">Spending Analytics</h2>
      <div className="space-y-3">
        <div><p className="text-zinc-400 text-xs">Income {Math.round(income/total*100)}%</p><div className="h-2 bg-zinc-800 rounded"><div className="h-2 bg-green-500 rounded" style={{width: `${income/total*100}%`}} /></div></div>
        <div><p className="text-zinc-400 text-xs">Expense {Math.round(expense/total*100)}%</p><div className="h-2 bg-zinc-800 rounded"><div className="h-2 bg-red-500 rounded" style={{width: `${expense/total*100}%`}} /></div></div>
        <p className="text-zinc-500 text-xs mt-3">Total Records: {transactions.length} • {symbol}{transactions.reduce((a,c)=>a+Math.abs(Number(c.amount)),0).toLocaleString()} moved</p>
      </div>
    </div>
  );
}
