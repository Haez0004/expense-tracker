import { Link, useLocation } from "react-router-dom";

const items = [
  { to: "/", label: "Dashboard" },
  { to: "/transactions", label: "Transactions" },
  { to: "/analytics", label: "Analytics" },
  { to: "/budgets", label: "Budgets" },
  { to: "/settings", label: "Settings" },
  { to: "/about", label: "About" },
];

export default function Navbar() {
  const { pathname } = useLocation();
  return (
    <nav className="flex gap-2 overflow-x-auto bg-zinc-900 p-2 rounded-2xl border border-zinc-800 mb-5 no-scrollbar">
      {items.map(i => (
        <Link key={i.to} to={i.to}
          className={`whitespace-nowrap px-4 py-2 rounded-full text-sm transition ${
            pathname === i.to? "bg-white text-black font-bold" : "text-zinc-400 hover:text-white"
          }`}>
          {i.label}
        </Link>
      ))}
    </nav>
  );
}
