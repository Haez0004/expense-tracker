export default function Balance({ balance, income, expense }) {
  return (
    <>
      <div className="bg-zinc-800 rounded-2xl p-4 text-center border border-zinc-700">
        <h3 className="text-2xl font-bold">Balance: {balance}</h3>
      </div>
      <div className="flex justify-between mt-3 font-semibold">
        <span className="text-green-400">Income: {income}</span>
        <span className="text-red-400">Expense: {Math.abs(expense)}</span>
      </div>
    </>
  )
}
