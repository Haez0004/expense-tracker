import { useState } from "react";
import { Expense } from "../types";

type Props = {
  expenses: Expense[];
  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>;
  budgetLimit: number;
  currency: string;
}

export default function Dashboard({ expenses, setExpenses, budgetLimit }: Props) {
  const transactions = expenses;
  const setTransactions = setExpenses;
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<"income"|"expense">("expense");

  const totalExpense = transactions.filter(t=> Number(t.amount)<0).reduce((a,c)=>a+Math.abs(Number(c.amount)),0);
  const totalIncome = transactions.filter(t=> Number(t.amount)>0).reduce((a,c)=>a+Number(c.amount),0);
  const balance = totalIncome - totalExpense;

  const add = () => {
    if(!desc ||!amount) return;
    const val = type==="expense" ? -Math.abs(Number(amount)) : Math.abs(Number(amount));
    setTransactions([{id: Date.now(), description: desc, amount: val, category: type, date: new Date().toISOString()} as any,...transactions]);
    setDesc(""); setAmount("");
  };

  return (
    <div className="p-4 space-y-4">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4">
        <h3 className="text-white font-bold">Quick Stats</h3>
        <p className="text-zinc-500 text-xs mt-1">Total records: {transactions.length}</p>
        <div className="mt-2 space-y-1">
          <p className="text-green-400 text-sm">Income: {totalIncome.toLocaleString()}</p>
          <p className="text-red-400 text-sm">Expense: {totalExpense.toLocaleString()} / {budgetLimit.toLocaleString()} limit</p>
          <p className="text-white font-bold text-sm">Balance: {balance.toLocaleString()}</p>
        </div>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 space-y-3">
        <div className="flex gap-2">
          <button onClick={()=>setType("expense")} className={`flex-1 p-2 rounded-xl text-sm font-bold ${type==="expense"?"bg-red-500 text-white":"bg-zinc-800 text-zinc-400"}`}>Expense</button>
          <button onClick={()=>setType("income")} className={`flex-1 p-2 rounded-xl text-sm font-bold ${type==="income"?"bg-green-500 text-white":"bg-zinc-800 text-zinc-400"}`}>Income</button>
        </div>
        <input value={desc} onChange={e=>setDesc(e.target.value)} placeholder="Description (e.g Salary, Food)" className="w-full bg-zinc-800 text-white p-3 rounded-xl border border-zinc-700" />
        <input type="number" value={amount} onChange={e=>setAmount(e.target.value)} placeholder="Amount" className="w-full bg-zinc-800 text-white p-3 rounded-xl border border-zinc-700" />
        <button onClick={add} className={`w-full p-3 rounded-xl font-bold ${type==="expense"?"bg-white text-black":"bg-green-500 text-white"}`}>{type==="expense"?"Add Expense":"Add Income"}</button>
      </div>
    </div>
  );
}
