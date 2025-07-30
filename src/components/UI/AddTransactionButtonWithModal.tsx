import React, { useState } from "react";
import { PrimaryButton } from "./PrimaryButton";
import { Modal } from "./Modal";
import { AddTransactionForm } from "../AddTransactionForm";

export const AddTransactionButtonWithModal = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex justify-end mb-4">
        <PrimaryButton onClick={() => setOpen(true)}>
          Добавить транзакцию
        </PrimaryButton>

        <Modal isOpen={open} onClose={() => setOpen(false)}>
          <AddTransactionForm onSuccess={() => setOpen(false)} />
        </Modal>
      </div>
    </>
  );
};
