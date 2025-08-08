import { useState } from "react";
import { Modal } from "./Modal";
import { PrimaryButton } from "./PrimaryButton";
import { useSettingsStore } from "@/store/useSettingsStore";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export const DeleteTransactionModal = ({
  isOpen,
  onClose,
  onConfirm,
}: Props) => {
  const [dontAskAgain, setDontAskAgain] = useState(false);
  const setSkipDeleteConfirmation = useSettingsStore(
    (s) => s.setSkipDeleteConfirmation
  );

  const handleConfirm = () => {
    if (dontAskAgain) {
      setSkipDeleteConfirmation(true);
    }
    onConfirm();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="bg-white p-4 space-y-4">
        <h2 className="text-lg font-bold">Удалить транзакцию?</h2>
        <p className="text-sm text-neutral-600">Это действие нельзя отменить</p>
        <label className="flex items-center text-sm">
          <input
            type="checkbox"
            checked={dontAskAgain}
            onChange={(e) => setDontAskAgain(e.target.checked)}
            className="mr-2"
          />
          Больше не спрашивать
        </label>

        <div className="gap-2 mt-4">
          <PrimaryButton onClick={handleConfirm}>Удалить</PrimaryButton>
          <button
            onClick={onClose}
            className="text-sm w-full mt-4  text-neutral-500 hover:underline cursor-pointer"
          >
            Отмена
          </button>
        </div>
      </div>
    </Modal>
  );
};
