export default function About() {
  return (
    <div className="p-4 space-y-4 pb-24">
      {/* Header */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 text-center">
        <div className="text-4xl">💰</div>
        <h1 className="text-white font-bold text-lg mt-2">Haez Expense Tracker v3</h1>
        <p className="text-zinc-400 text-xs mt-1">Personal expense tracker built in <span className="text-white font-semibold">Termux on Android</span> — 100% offline</p>
        <div className="mt-3 space-y-1">
          <a href="https://expense-tracker-7455.vercel.app/" className="block text-[11px] text-green-400">Live: expense-tracker-7455.vercel.app</a>
          <a href="https://github.com/Haez0004/expense-tracker/" className="block text-[11px] text-zinc-500">Repo: github.com/Haez0004/expense-tracker</a>
        </div>
      </div>

      {/* Built With */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-3">
        <h2 className="text-white font-semibold text-sm">🛠️ Built With</h2>
        <ul className="text-zinc-400 text-xs space-y-1.5 leading-relaxed">
          <li>• React + TypeScript + Vite</li>
          <li>• Tailwind CSS for styling</li>
          <li>• React Router for navigation</li>
          <li>• PWA - manifest.json + Service Worker</li>
          <li>• localStorage — 100% offline, no backend</li>
          <li>• Multi-currency support (NGN, USD, EUR, etc)</li>
        </ul>
      </div>

      {/* How It Works */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-3">
        <h2 className="text-white font-semibold text-sm">⚙️ How It Works</h2>
        <ul className="text-zinc-400 text-xs space-y-2.5 leading-relaxed">
          <li><span className="text-white">Dashboard:</span> Add income (green +) or expense (red -). Shows Total Income, Total Expense, Balance and Budget limit.</li>
          <li><span className="text-white">Transactions:</span> View all records. Income in green, expense in red. Edit description/amount or delete.</li>
          <li><span className="text-white">Analytics:</span> Calculates daily/weekly spending, top category, average per day.</li>
          <li><span className="text-white">Budgets:</span> Set monthly limit (e.g 200,000). Visual progress bar turns yellow at 50% and red at 80%.</li>
          <li><span className="text-white">Settings:</span> Change budget limit and currency. All data saved to your phone — works offline.</li>
        </ul>
      </div>

      {/* Features - PWA focus */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
        <h2 className="text-white font-semibold text-sm">📱 Features</h2>
        <ul className="text-zinc-400 text-xs space-y-1.5 leading-relaxed mt-3">
          <li>• public/manifest.json - makes app installable (standalone display and icon)</li>
          <li>• public/sw.js - Service Worker caches assets for offline use</li>
          <li>• Install prompt on Android/Chrome</li>
          <li>• Works fully offline after first load</li>
          <li>• Edit & Delete transactions</li>
          <li>• Income/Expense color coding</li>
          <li>• Budget alerts (50% / 80%)</li>
          <li>• Multi-currency</li>
        </ul>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 text-center">
        <p className="text-white text-xs font-bold">Author: HAEZ</p>
        <p className="text-zinc-600 text-[10px] mt-1">React Router Project • 2026 • Built in Termux</p>
      </div>
    </div>
  );
}
