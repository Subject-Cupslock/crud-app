import React from "react";
import { TransactionRow } from "./TransactionRow";

type Transactions = {
  id: string;
  date: string;
  category: string;
  amount: string;
  type: "INCOME" | "EXPENSE";
  comment?: string;
};

export const TransactionTable = ({ data }: { data: Transactions[] }) => {
  return (
    <div className="border border-neutral-200 text-sm text-neutral-800 mb-4">
      <table className="w-full table-auto">
        <thead className="bg-neutral-100 text-left text-xs uppercase tracking-wider text-neutral-600">
          <tr>
            <th className="px-4 py-2 font-medium">Дата</th>
            <th className="px-4 py-2 font-medium">Категория</th>
            <th className="px-4 py-2 font-medium">Сумма</th>
            <th className="px-4 py-2 font-medium">Тип</th>
            <th className="px-4 py-2 font-medium">Комментарий</th>
          </tr>
        </thead>
        <tbody>
          {data.map((tx) => (
            <TransactionRow key={tx.id} {...tx} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
