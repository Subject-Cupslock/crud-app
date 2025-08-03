import React, { useState } from "react";
import { PrimaryButton } from "./PrimaryButton";
import { Modal } from "./Modal";
import { TransactionForm } from "../features/transaction/TransactionForm";
import { Transaction } from "@/types";
import { useTransactionMutations } from "@/hooks/useTransactionsMutations";

export const AddTransactionButtonWithModal = () => {
  const [open, setOpen] = useState(false);
  const { create } = useTransactionMutations();

  const handleSubmit = (data: Omit<Transaction, "id">) => {
    create.mutate(data, {
      onSuccess: () => setOpen(false),
    });
  };

  return (
    <>
      <div className="flex justify-end mb-4">
        <PrimaryButton onClick={() => setOpen(true)}>
          Добавить транзакцию
        </PrimaryButton>

        <Modal isOpen={open} onClose={() => setOpen(false)}>
          <TransactionForm
            mode="create"
            onSubmit={handleSubmit}
            onCancel={() => setOpen(false)}
          />
        </Modal>
      </div>
    </>
  );
};
