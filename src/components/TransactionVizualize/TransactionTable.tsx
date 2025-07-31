"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { TransactionRow } from "./TransactionRow";
import { ContextMenu } from "../UI/ContextMenu";

type Transaction = {
  id: string;
  date: string;
  category: string;
  amount: string;
  type: "INCOME" | "EXPENSE";
  comment?: string;
};

export const TransactionTable = () => {
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
    transactionId: string;
  } | null>(null);

  const { data = [] } = useQuery<Transaction[]>({
    queryKey: ["transactions"],
    queryFn: async () => {
      const res = await fetch("/api/transactions");
      return res.json();
    },
  });

  const handleRightClick = (e: React.MouseEvent, transactionId: string) => {
    e.preventDefault();
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      transactionId,
    });
  };

  const closeContext = () => {
    setContextMenu(null);
  };

  const handleEdit = () => {
    console.log("Edit", contextMenu?.transactionId);
    closeContext();
  };

  const handleDelete = () => {
    console.log("Delete", contextMenu?.transactionId);
    closeContext();
  };

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
            <TransactionRow
              key={tx.id}
              {...tx}
              onRightClick={(e) => handleRightClick(e, tx.id)}
            />
          ))}
        </tbody>
      </table>

      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onClose={closeContext}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};
