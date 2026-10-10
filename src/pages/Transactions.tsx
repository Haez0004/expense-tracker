import { useState, useMemo } from "react";
import { Expense, Currency, CURRENCIES } from "../types";

type Props = {
  transactions: Expense[];
  setTransactions: React.Dispatch<React.SetStateAction<Expense[]>>;
  currency: Currency;
}

export default function Transactions({ transactions, setTransactions, currency }: Props) {
  const symbol = CURRENCIES[currency]?.symbol || "₦";
  const [editing, setEditing] = useState<Expense | null>(null);
  const [editDesc, setEditDesc] = useState("");
  const [editAmt, setEditAmt] = useState("");

  // NEW FILTERS
  const [search, setSearch] = useState("");
  const [monthFilter, setMonthFilter] = useState("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const del = (id: number) => {
    if(!confirm("Delete this record?")) return;
    setTransactions(transactions.filter(t => t.id!== id));
  };

  const startEdit = (t: Expense) => {
    setEditing(t);
    setEditDesc(t.description);
    setEditAmt(Math.abs(Number(t.amount)).toString());
  };

  const saveEdit = () => {
    if(!editing) return;
    const isIncome = Number(editing.amount) >= 0;
    const newAmount = isIncome? Math.abs(Number(editAmt)) : -Math.abs(Number(editAmt));
    setTransactions(transactions.map(t => t.id === editing.id? {...t, description: editDesc, amount: newAmount } : t));
    setEditing(null);
  };

  // MONTH LIST
  const months = useMemo(() => {
    return Array.from(new Set(transactions.map(t => {
      const d = new Date((t as any).date || Date.now());
      return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;
    })));
  }, [transactions]);

  // FILTERED LOGIC
  const filtered = useMemo(() => {
    return transactions.filter(t => {
      const descMatch = t.description.toLowerCase().includes(search.toLowerCase());

      const tDate = new Date((t as any).date || Date.now());
      const monthKey = `${tDate.getFullYear()}-${String(tDate.getMonth()+1).padStart(2,'0')}`;
      const monthMatch = monthFilter === "all"? true : monthKey === monthFilter;

      const time = tDate.getTime();
      const fromTime = dateFrom? new Date(dateFrom).getTime() : 0;
      const toTime = dateTo? new Date(dateTo + "T23:59:59").getTime() : Infinity;
      const dateMatch = time >= fromTime && time <= toTime;

      return descMatch && monthMatch && dateMatch;
    });
  }, [transactions, search, monthFilter, dateFrom, dateTo]);

  return (
    <div className="p-4 space-y-3 pb-20 bg-black min-h-screen">
      <h2 className="text-white font-bold">Transactions ({filtered.length}/{transactions.length})</h2>

      {/* SEARCH + FILTER UI */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-3 space-y-3">
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search description..." className="w-full bg-zinc-800 text-white p-3 rounded-xl border border-zinc-700 text-sm" />

        <div className="grid grid-cols-2 gap-2">
          <select value={monthFilter} onChange={e=>setMonthFilter(e.target.value)} className="w-full bg-zinc-800 text-white p-3 rounded-xl border border-zinc-700 text-sm">
            <option value="all">All Months</option>
            {months.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
          <button onClick={()=>{setSearch(""); setMonthFilter("all"); setDateFrom(""); setDateTo("")}} className="bg-zinc-800 text-zinc-400 text-xs py-3 rounded-xl border border-zinc-700">Clear Filters</button>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <p className="text-zinc-500 text-[11px] mb-1">From Date</p>
            <input type="date" value={dateFrom} onChange={e=>setDateFrom(e.target.value)} className="w-full bg-zinc-800 text-white p-2 rounded-xl border border-zinc-700 text-sm" />
          </div>
          <div>
            <p className="text-zinc-500 text-[11px] mb-1">To Date</p>
            <input type="date" value={dateTo} onChange={e=>setDateTo(e.target.value)} className="w-full bg-zinc-800 text-white p-2 rounded-xl border border-zinc-700 text-sm" />
          </div>
        </div>
      </div>

      {filtered.map(t => {
        const isIncome = Number(t.amount) >= 0;
        return (
          <div key={t.id} className="bg-zinc-900 border border-zinc-800 rounded-xl p-3">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-white text-sm font-medium">{t.description}</p>
                <p className="text-zinc-500 text-xs">{(t as any).category}</p>
              </div>
              <p className={`text-sm font-bold ${isIncome? 'text-green-400':'text-red-400'}`}>
                {isIncome? '+': '-'} {symbol}{Math.abs(Number(t.amount)).toLocaleString()}
              </p>
            </div>
            <div className="flex gap-2 mt-2">
              <button onClick={() => startEdit(t)} className="flex-1 bg-zinc-800 text-white text-xs py-2 rounded-lg border border-zinc-700">Edit</button>
              <button onClick={() => del(t.id)} className="flex-1 bg-red-500/10 text-red-400 text-xs py-2 rounded-lg border border-red-500/20">Delete</button>
            </div>
          </div>
        );
      })}

      {filtered.length===0 && (
        <p className="text-zinc-500 text-sm text-center py-10">No records for this filter. Try Clear Filters.</p>
      )}

      {transactions.length===0 && (
        <p className="text-zinc-500 text-sm text-center py-10">No records. Add from Dashboard.</p>
      )}

      {editing && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 w-full max-w-sm space-y-3">
            <h3 className="text-white font-bold">Edit Transaction</h3>
            <input value={editDesc} onChange={e=>setEditDesc(e.target.value)} className="w-full bg-zinc-800 text-white p-3 rounded-xl border border-zinc-700 text-sm" />
            <input type="number" value={editAmt} onChange={e=>setEditAmt(e.target.value)} className="w-full bg-zinc-800 text-white p-3 rounded-xl border border-zinc-700 text-sm" />
            <div className="flex gap-2">
              <button onClick={() => setEditing(null)} className="flex-1 bg-zinc-800 text-white py-3 rounded-xl text-sm">Cancel</button>
              <button onClick={saveEdit} className="flex-1 bg-white text-black py-3 rounded-xl font-bold text-sm">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
