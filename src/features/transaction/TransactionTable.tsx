"use client";

import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TransactionRow } from "./TransactionRow";
import { ContextMenu } from "../../ui/ContextMenu";

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
  const [editId, setEditId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Transaction | null>(null);

  const { data = [], refetch } = useQuery<Transaction[]>({
    queryKey: ["transactions", { page: 1, limit: 10 }],
    queryFn: async () => {
      const res = await fetch("/api/transactions?page=1&limit=10");
      return res.json();
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: Transaction) =>
      fetch("/api/transactions", {
        method: "PUT",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      }).then((res) => res.json()),
    onSuccess: () => {
      refetch();
      setEditId(null);
      setEditData(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) =>
      fetch("/api/transactions", {
        method: "DELETE",
        body: JSON.stringify({ id }),
        headers: { "Content-Type": "application/json" },
      }).then((res) => res.json()),
    onSuccess: () => refetch(),
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

  const handleEdit = (transaction: Transaction) => {
    setEditId(transaction.id);
    setEditData(transaction);
    closeContext();
  };

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
    closeContext();
  };

  const handleSaveEdit = (updatedData: Transaction) => {
    updateMutation.mutate(updatedData);
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
          {data.map((tx) =>
            editId === tx.id ? (
              <TransactionRow
                key={tx.id}
                id={tx.id}
                {...tx}
                isEditing={true}
                onSave={handleSaveEdit}
                onCancel={() => {
                  setEditId(null);
                  setEditData(null);
                }}
              />
            ) : (
              <TransactionRow
                key={tx.id}
                {...tx}
                onRightClick={(e) => handleRightClick(e, tx.id)}
                onEdit={() => handleEdit(tx)}
              />
            )
          )}
        </tbody>
      </table>

      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onClose={() => setContextMenu(null)}
          onEdit={() =>
            handleEdit(data.find((tx) => tx.id === contextMenu.transactionId)!)
          }
          onDelete={() => handleDelete(contextMenu.transactionId)}
        />
      )}
    </div>
  );
};
