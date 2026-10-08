export default function About() {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 text-center">
      <div className="text-4xl mb-2">💰</div>
      <h2 className="text-white font-bold text-lg">Haez Expense Tracker v3</h2>
      <p className="text-zinc-400 text-sm mt-2">Built with React + Tailwind + React Router in Termux.</p>
      <div className="text-left mt-5 space-y-2 text-sm text-zinc-300">
        <p>✓ Dashboard with balance</p><p>✓ Add income/expense</p><p>✓ Analytics & budget tracking</p><p>✓ 100% offline - localStorage</p>
      </div>
      <p className="text-zinc-600 text-xs mt-6"> • React Router Project • 2026</p>
    </div>
  );
}
