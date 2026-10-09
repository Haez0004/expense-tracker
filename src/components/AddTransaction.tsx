export default function AddTransaction({ text, setText, amount, setAmount, addIncome, addExpense }) {
  const inputStyle = "w-full p-3 rounded-xl bg-zinc-800 border border-zinc-700 outline-none mb-3 text-white placeholder:text-zinc-400 focus:border-white"

  return (
    <>
      <input
        type="text"
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="e.g. Garri"
        className={inputStyle}
        style={{color:'white'}}
      />
      <input
        type="number"
        value={amount}
        onChange={e => setAmount(e.target.value)}
        placeholder="Amount"
        className={inputStyle}
        style={{color:'white'}}
      />
      <div className="flex gap-3">
        <button onClick={addIncome} className="flex-1 bg-black text-white p-3 rounded-xl font-semibold">Add Income</button>
        <button onClick={addExpense} className="flex-1 bg-black text-white p-3 rounded-xl font-semibold">Add Expense</button>
      </div>
    </>
  )
}
