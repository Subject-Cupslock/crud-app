import React, { useEffect, useRef } from "react";

type Props = {
  x: number;
  y: number;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
};

export const ContextMenu = ({ x, y, onClose, onEdit, onDelete }: Props) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  return (
    <div
      ref={ref}
      className="fixed bg-white border rounded shadow-md z-50 w-40"
      style={{ top: y, left: x }}
    >
      <ul className="text-sm text-neutral-700">
        <li
          onClick={onEdit}
          className="px-4 py-2 hover:bg-neutral-100 cursor-pointer"
        >
          Редактировать
        </li>
        <li
          onClick={onDelete}
          className="px-4 py-2 hover:bg-neutral-100 cursor-pointer text-red-600"
        >
          Удалить
        </li>
      </ul>
    </div>
  );
};
