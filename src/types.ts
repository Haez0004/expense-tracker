export type Expense = {
  id: string;
  text: string;
  amount: number;
  category: string;
  date: string;
  type: "income" | "expense";
}

export type Currency = "NGN" | "USD" | "EUR" | "GBP" | "GHS" | "KES";

export const CURRENCIES: Record<Currency, { symbol: string, name: string }> = {
  NGN: { symbol: "₦", name: "Nigerian Naira" },
  USD: { symbol: "$", name: "US Dollar" },
  EUR: { symbol: "€", name: "Euro" },
  GBP: { symbol: "£", name: "British Pound" },
  GHS: { symbol: "₵", name: "Ghana Cedis" },
  KES: { symbol: "KSh", name: "Kenya Shilling" },
}
