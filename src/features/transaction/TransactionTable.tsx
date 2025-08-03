"use client";

import React, { useState } from "react";
import { TransactionRow } from "./TransactionRow";
import { ContextMenu } from "@/ui/ContextMenu";
import { useQuery } from "@tanstack/react-query";
import { useTransactionMutations } from "@/hooks/useTransactionsMutations";
import { Transaction } from "@/types";



export const TransactionTable = () => {
  const { data: transactions = [] } = useQuery<Transaction[]>({
    queryKey: ["transactions"],
    queryFn: async () => {
      const res = await fetch("/api/transactions");
      return res.json();
    },
  });

  const { update, remove } = useTransactionMutations();

  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
    transactionId: string;
  } | null>(null);

  const handleRightClick = (e: React.MouseEvent, txId: string) => {
    e.preventDefault();
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      transactionId: txId,
    });
  };

  const handleCloseMenu = () => setContextMenu(null);

  const handleEdit = (txId: string) => {
    const tx = transactions.find((t) => t.id === txId);
    if (!tx) return;

    const newComment = prompt("Новый комментарий:", tx.comment || "");
    if (newComment !== null) {
      update.mutate({ ...tx, comment: newComment });
    }

    handleCloseMenu();
  };

  const handleDelete = (txId: string) => {
    if (confirm("Удалить транзакцию?")) {
      remove.mutate(txId);
    }
    handleCloseMenu();
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
          {transactions.map((tx) => (
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
          onClose={handleCloseMenu}
          onEdit={() => handleEdit(contextMenu.transactionId)}
          onDelete={() => handleDelete(contextMenu.transactionId)}
        />
      )}
    </div>
  );
};
