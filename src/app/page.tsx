"use client";
import { AddTransactionForm } from "@/components/AddTransactionForm";
import { useQuery } from "@tanstack/react-query";

type Transactions = {
  id: string;
  date: string;
  category: string;
  amount: string;
  type: "INCOME" | "EXPENSE";
  comment?: string;
};

export default function Home() {
  const { data, isLoading, error } = useQuery<Transactions[]>({
    queryKey: ["transactions"],
    queryFn: async () => {
      const res = await fetch("/api/transactions");
      if (!res.ok) throw new Error("Failed to fetch transactions");
      return res.json();
    },
  });

  if (isLoading) return <div>Загрузка</div>;
  if (error) return <div>Ошибка: {(error as Error).message}</div>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-2">Транзакции</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <AddTransactionForm />
    </div>
  );
}
