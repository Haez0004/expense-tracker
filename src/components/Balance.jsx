export default function Balance({ balance, income, expense }) {
  return (
    <div className="bg-zinc-800 rounded-2xl p-5 text-center border border-zinc-700 mb-4 w-full">
      <h3 className="text-2xl font-bold text-white">Balance: ₦{balance}</h3>
      <div className="flex justify-between w-full mt-4 px-2 font-semibold">
        <span className="text-green-400">Income: ₦{income}</span>
        <span className="text-red-400">Expense: ₦{Math.abs(expense)}</span>
      </div>
    </div>
  )
}
