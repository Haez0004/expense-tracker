export default function TransactionList({ transactions }) {
  if (!transactions || transactions.length === 0) {
    return (
      <div className="bg-zinc-900 border border-dashed border-zinc-700 rounded-2xl p-8 text-center mt-4">
        <div className="text-5xl mb-3">📊</div>
        <h3 className="text-white font-bold text-lg">No transactions yet</h3>
        <p className="text-zinc-400 text-sm mt-1">Add your first income or expense above.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 mt-4">
      {transactions.map((t, i) => (
        <div key={i} className="flex justify-between p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white">
          <span>{t.text} - ₦{Math.abs(t.amount)}</span>
        </div>
      ))}
    </div>
  );
}
