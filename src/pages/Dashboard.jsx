import { useState } from "react";

export default function Dashboard({ transactions, addTransaction }) {
  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");

  const income = transactions.filter(t=> Number(t.amount) > 0).reduce((a,c)=>a+Number(c.amount),0);
  const expense = transactions.filter(t=> Number(t.amount) < 0).reduce((a,c)=>a+Math.abs(Number(c.amount)),0);
  const balance = income - expense;

  const add = (type) => {
    if(!text || !amount) return alert("Enter description and amount");
    const num = Number(amount);
    const finalAmount = type==="income" ? Math.abs(num) : -Math.abs(num);
    addTransaction({ id: Date.now(), text, amount: finalAmount });
    setText(""); setAmount("");
  };

  return (
    <div className="space-y-4">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 text-center">
        <h2 className="text-zinc-400 text-sm">Balance: ₦{balance.toLocaleString()}</h2>
        <div className="flex justify-between mt-3 text-sm">
          <span className="text-green-400">Income: ₦{income.toLocaleString()}</span>
          <span className="text-red-400">Expense: ₦{expense.toLocaleString()}</span>
        </div>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 space-y-2">
        <input value={text} onChange={e=>setText(e.target.value)} placeholder="e.g. Garri" className="w-full bg-zinc-800 text-white p-3 rounded-xl outline-none" />
        <input value={amount} onChange={e=>setAmount(e.target.value)} type="number" placeholder="Amount" className="w-full bg-zinc-800 text-white p-3 rounded-xl outline-none" />
        <div className="flex gap-2">
          <button onClick={()=>add("income")} className="flex-1 bg-white text-black py-3 rounded-xl font-bold">Add Income</button>
          <button onClick={()=>add("expense")} className="flex-1 bg-red-600 text-white py-3 rounded-xl font-bold">Add Expense</button>
        </div>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4">
        <h3 className="text-white font-bold">Quick Stats</h3>
        <p className="text-zinc-500 text-xs mt-1">Total records: {transactions.length}</p>
      </div>
    </div>
  );
}
