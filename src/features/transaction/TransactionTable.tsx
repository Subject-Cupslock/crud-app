"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useTransactionMutations } from "@/hooks/useTransactionsMutations";
import { Transaction } from "@/types";
import { TransactionRow } from "./TransactionRow";
import { ContextMenu } from "@/ui/ContextMenu";
import { Modal } from "@/ui/Modal";
import { TransactionForm } from "@/features/transaction/TransactionForm";
import { DeleteTransactionModal } from "@/ui/DeleteTransactionModal";

export const TransactionTable = () => {
  const { data: transactions = [] } = useQuery<Transaction[]>({
    queryKey: ["transactions"],
    queryFn: async () => {
      const res = await fetch("/api/transactions");
      return res.json();
    },
  });

  const [deleteTxId, setDeleteTxId] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { update, remove } = useTransactionMutations();

  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
    transactionId: string;
  } | null>(null);

  const [editingTransaction, setEditingTransaction] =
    useState<Transaction | null>(null);

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

    setEditingTransaction(tx);
    handleCloseMenu();
  };

  const handleDelete = (txId: string) => {
    const skip = localStorage.getItem("skipDeleteConfirmation") === "true";
    if (skip) {
      remove.mutate(txId);
      handleCloseMenu();
    } else {
      setDeleteTxId(txId);
      setShowDeleteModal(true);
    }
  };

  const handleModalClose = () => setEditingTransaction(null);

  const handleFormSubmit = (updated: Transaction) => {
    update.mutate(updated, {
      onSuccess: handleModalClose,
    });
  };

  return (
    <>
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

      <DeleteTransactionModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={() => {
          if (deleteTxId) {
            remove.mutate(deleteTxId);
            setDeleteTxId(null);
          }
          setShowDeleteModal(false);
          handleCloseMenu();
        }}
      />

      <Modal isOpen={!!editingTransaction} onClose={handleModalClose}>
        {editingTransaction && (
          <TransactionForm
            mode="edit"
            initialValues={editingTransaction}
            onSubmit={handleFormSubmit}
            onCancel={handleModalClose}
          />
        )}
      </Modal>
    </>
  );
};
