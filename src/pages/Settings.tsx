import { useState, useEffect } from "react";
import { Currency, CURRENCIES } from "../types";

type Props = {
  onClear: () => void;
  budgetLimit: number;
  setBudgetLimit: (n: number) => void;
  currency: Currency;
  setCurrency: (c: Currency) => void;
}

export default function Settings({ onClear, budgetLimit, setBudgetLimit, currency, setCurrency }: Props) {
  const [localLimit, setLocalLimit] = useState(budgetLimit);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setLocalLimit(budgetLimit);
  }, [budgetLimit]);

  const handleSave = () => {
    const val = Number(localLimit);
    setBudgetLimit(val);
    localStorage.setItem('budgetLimit', String(val));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div style={{padding: "12px", display: "flex", flexDirection: "column", gap: "16px"}}>
      <div style={{background: "#111", border: "1px solid #333", borderRadius: "12px", padding: "16px"}}>
        <h3 style={{color: "white", fontWeight: "bold", marginBottom: "16px"}}>Settings</h3>
        <p style={{color: "#888", fontSize: "13px", marginBottom: "8px"}}>Monthly Budget Limit ({CURRENCIES[currency].symbol})</p>
        <div style={{display: "flex", gap: "8px"}}>
          <input type="number" value={localLimit} onChange={e => setLocalLimit(Number(e.target.value))} style={{flex: 1, background: "#222", color: "white", padding: "12px", borderRadius: "10px", border: "1px solid #333"}} />
          <button onClick={handleSave} style={{background: saved? "#22c55e" : "white", color: saved? "white" : "black", padding: "0 24px", borderRadius: "10px", fontWeight: "bold", border: "none"}}>{saved? "Saved!" : "Save"}</button>
        </div>
        <p style={{color: saved? "#22c55e" : "#666", fontSize: "12px", marginTop: "8px"}}>{saved? "✓ Saved!" : `Current: ${CURRENCIES[currency].symbol}${budgetLimit.toLocaleString()}`}</p>
        <div style={{marginTop: "20px", display: "flex", justifyContent: "space-between", alignItems: "center"}}>
          <span style={{color: "#aaa", fontSize: "14px"}}>Currency</span>
          <select value={currency} onChange={e => setCurrency(e.target.value as Currency)} style={{background: "#222", color: "white", padding: "8px 12px", borderRadius: "8px", border: "1px solid #333"}}>
            {Object.entries(CURRENCIES).map(([code, {symbol, name}]) => (<option key={code} value={code}>{symbol} {code} - {name}</option>))}
          </select>
        </div>
      </div>
      <button onClick={onClear} style={{background: "#dc2626", color: "white", width: "100%", padding: "14px", borderRadius: "12px", fontWeight: "bold", border: "none"}}>Clear All Data</button>
    </div>
  );
}
