"use client";

import { useEffect, useState } from "react";
import { Settings } from "lucide-react";
import { useSettingsStore } from "@/store/useSettingsStore";

export const SettingsMenu = () => {
  const [open, setOpen] = useState(false);
  const skipDeleteConfirmation = useSettingsStore(
    (s) => s.skipDeleteConfirmation
  );
  const resetDeleteConfirmation = useSettingsStore(
    (s) => s.resetDeleteConfirmation
  );

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
            {!skipDeleteConfirmation ? (
              <span className="text-green-600 font-medium">Включено</span>
            ): (
              <button onClick={resetDeleteConfirmation} className="text-blue-600 hover:underline text-sm w-full">Включить</button>
            )}
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
