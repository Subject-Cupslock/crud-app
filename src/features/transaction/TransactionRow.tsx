"use client";
import React from "react";

type Props = {
  id: string;
  date: string;
  category: string;
  amount: string;
  type: "INCOME" | "EXPENSE";
  comment?: string;
  onRightClick?: (e: React.MouseEvent) => void;
  onEdit?: () => void;
};

export const TransactionRow = ({
  id,
  date,
  category,
  amount,
  type,
  comment,
  onRightClick,
  onEdit,
}: Props) => {
  const isIncome = type === "INCOME";
  const formattedDate = new Date(date).toLocaleDateString("ru-RU");

  return (
    <tr
      className="border-t hover:bg-neutral-50 transition"
      onContextMenu={onRightClick}
      onDoubleClick={onEdit}
    >
      <td className="px-4 py-2">{formattedDate}</td>
      <td className="px-4 py-2 font-medium">{category}</td>
      <td
        className={`px-4 py-2 font-semibold ${
          isIncome ? "text-green-600" : "text-red-600"
        }`}
      >
        {isIncome ? "+" : "-"}
        {amount}₽
      </td>
      <td className="px-4 py-2">
        <span
          className={`inline-block text-xs px-2 py-0.5 rounded font-medium ${
            isIncome ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}
        >
          {isIncome ? "Доход" : "Расход"}
        </span>
      </td>
      <td className="px-4 py-2 text-neutral-500">{comment || "-"}</td>
    </tr>
  );
};
