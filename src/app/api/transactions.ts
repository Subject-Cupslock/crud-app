import { Transaction } from "@/types";

export async function getTransactions(
  page = 1,
  limit = 10
): Promise<Transaction[]> {
  const res = await fetch(`/api/transactions?page=${page}&limit=${limit}`);
  if (!res.ok) throw new Error("Ошибка при загрузке транзакций");
  return res.json();
}

export async function createTransaction(
  data: Omit<Transaction, "id">
): Promise<Transaction> {
  const res = await fetch("/api/transactions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Ошибка при создании транзакции");
  return res.json();
}

export async function updateTransaction(
  data: Transaction
): Promise<Transaction> {
  const res = await fetch(`/api/transactions`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Ошибка при обновлении транзакции");
  return res.json();
}

export async function deleteTransaction(id: string): Promise<void> {
  const res = await fetch(`/api/transactions`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  });
  if (!res.ok) throw new Error("Ошибка при удалении транзакции");
}
