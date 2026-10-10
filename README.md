# Haez Expense Tracker v3

Personal expense tracker built in Termux on Android - 100% offline.

Live Demo: https://expense-tracker-7455.vercel.app/
Repo: https://github.com/Haez004/expense-tracker/

### 🛠️ Built With
- React + TypeScript + Vite
- Tailwind CSS for styling
- React Router for navigation
- PWA - manifest.json + Service Worker
- localStorage - 100% offline, no backend
- Multi-currency support (NGN, USD, EUR, etc)

### ⚙️ How It Works
**Dashboard:** Add income (green +) or expense (red -). Shows Total Income, Total Expense, Balance and Budget limit.

**Transactions:** View all records. Income in green, expense in red. Edit description/amount or delete.

**Analytics:** Calculates daily/weekly spending, top category, average per day.

**Budgets:** Set monthly limit (e.g 200,000). Visual progress bar turns yellow at 50% and red at 80%.

**Settings:** Change budget limit and currency. All data saved to your phone - works offline.

### 📱 Features
- Public/manifest.json - makes app installable (standalone display and icon)
- Public/Service Worker.js - Service Worker caches assets for offline use
- Install prompt on Android/Chrome
- Works fully offline after first load
- Edit & Delete transactions
- Income/Expense color coding
- Budget alerts (50% / 80%)
- Multi-currency

### 🚀 Advanced Hooks & State Architecture 

**1. Custom Hook: `useLocalStorage<T>`**
- Generic hook: `useLocalStorage<T>(key, initialValue)`
- Handles JSON parse with try/catch to prevent crash
- Syncs state to localStorage on every change via useEffect
- Used for persistence: data survives refresh (e.g ₦49,700 stays)

**2. Custom Hook: `useBudgetAlert`**
- Takes `expenses[]` + `budgetLimit`
- Uses `useMemo` for performance - only recalculates when expenses/budget change
- Returns `{ total, percent, isOver }`
- Powers Budget warning: turns yellow at 50%, red when over

**3. Context + useReducer Pattern**
- `ExpenseContext.tsx` with `useReducer`, not useState
- Actions: `ADD_EXPENSE`, `DELETE_EXPENSE`, `SET_BUDGET`, `SET_CURRENCY`, `CLEAR_ALL`, `HYDRATE`
- `HYDRATE` pattern: loads saved data from localStorage on first render
- `ExpenseProvider` wraps entire App - no prop drilling
- Custom hook `useExpenses()` to consume context - throws if used outside Provider

### 👤 Author
HAEZ - Built in Termux on Android

