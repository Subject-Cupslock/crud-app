"use client";
import { AddTransactionForm } from "@/features/transaction/AddTransactionForm";
import { TransactionTable } from "@/features/transaction/TransactionTable";
import { AddTransactionButtonWithModal } from "@/ui/AddTransactionButtonWithModal";
import { SettingsMenu } from "@/ui/SettingsMenu";
import { useQuery } from "@tanstack/react-query";
import { Divide } from "lucide-react";

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
      if (!res.ok) throw new Error("Ошибка загрузки");
      return res.json();
    },
  });

  if (isLoading) return <div className="p-4">Загрузка</div>;
  if (error)
    return (
      <div className="p-4 text-red-500">Ошибка: {(error as Error).message}</div>
    );

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold mb-4">Транзакции</h1>
        <SettingsMenu />
      </div>
      {data && data.length > 0 ? (
        <TransactionTable />
      ) : (
        <div className="text-neutral-500">Нет транзакции</div>
      )}
      <AddTransactionButtonWithModal />
    </div>
  );
}
