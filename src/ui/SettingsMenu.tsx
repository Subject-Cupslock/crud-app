"use client";

import { useEffect, useState } from "react";
import { Settings } from "lucide-react";

export const SettingsMenu = () => {
  const [open, setOpen] = useState(false);
  const [deleteConfirmEnabled, setDeleteConfirmEnabled] = useState(true);

  useEffect(() => {
    const flag = localStorage.getItem("disableDeleteConfirm");
    setDeleteConfirmEnabled(flag !== "true");
  }, []);

  const toggleDeleteConfirm = () => {
    const newValue = !deleteConfirmEnabled;
    setDeleteConfirmEnabled(newValue);
    localStorage.setItem("disableDeleteConfirm", (!newValue).toString());
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="text-neutral-600 hover:text-black transition"
        aria-label="Настройки"
      >
        <Settings />
      </button>

      {open && (
        <div className="absolute right-0 top-10 bg-white border rounded shadow p-4 w-64 z-50 text-sm">
          <h2 className="font-semibold mb-2">Настройки</h2>

          <div className="flex justify-between items-center mb-3">
            <span>Подтверждение удаления</span>
            <button
              onClick={toggleDeleteConfirm}
              className="text-blue-600 hover:underline text-sm"
            >
              {deleteConfirmEnabled
                ? "Включено (нажми, чтобы выключить)"
                : "Выключено (нажми, чтобы включить)"}
            </button>
          </div>

          <button
            onClick={() => setOpen(false)}
            className="mt-2 text-neutral-500 hover:text-black text-xs underline"
          >
            Закрыть
          </button>
        </div>
      )}
    </div>
  );
};
