import { useState } from "react";

export default function Settings({ onClear, budgetLimit, setBudgetLimit }) {
  const [temp, setTemp] = useState(budgetLimit);

  const save = () => {
    setBudgetLimit(Number(temp));
    alert(`Budget updated to ₦${Number(temp).toLocaleString()}`);
  };

  const inc = (val) => setTemp(prev => Number(prev) + val);
  const dec = (val) => setTemp(prev => Math.max(1000, Number(prev) - val));

  return (
    <div className="space-y-3">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
        <h2 className="text-white font-bold">Settings</h2>

        <div className="mt-5">
          <label className="text-zinc-400 text-xs">Monthly Budget Limit</label>
          <div className="flex gap-2 mt-2">
            <input value={temp} onChange={e=>setTemp(e.target.value)} type="number" className="flex-1 bg-zinc-800 text-white p-3 rounded-xl outline-none" />
            <button onClick={save} className="bg-white text-black px-5 rounded-xl font-bold">Save</button>
          </div>

          <div className="flex gap-2 mt-3">
            <button onClick={()=>dec(5000)} className="flex-1 bg-zinc-800 text-white py-2 rounded-xl">-5k</button>
            <button onClick={()=>dec(10000)} className="flex-1 bg-zinc-800 text-white py-2 rounded-xl">-10k</button>
            <button onClick={()=>inc(5000)} className="flex-1 bg-zinc-800 text-white py-2 rounded-xl">+5k</button>
            <button onClick={()=>inc(10000)} className="flex-1 bg-zinc-800 text-white py-2 rounded-xl">+10k</button>
          </div>
          <p className="text-zinc-500 text-[11px] mt-2">Current: ₦{budgetLimit.toLocaleString()}</p>
        </div>

        <div className="mt-6 space-y-3 text-sm border-t border-zinc-800 pt-4">
          <div className="flex justify-between text-zinc-400"><span>Currency</span><span className="text-white">₦ NGN</span></div>
          <div className="flex justify-between text-zinc-400"><span>Theme</span><span className="text-white">Dark</span></div>
        </div>
      </div>

      <button onClick={onClear} className="w-full bg-red-600 text-white py-3 rounded-xl font-bold">Clear All Data</button>
    </div>
  );
}
