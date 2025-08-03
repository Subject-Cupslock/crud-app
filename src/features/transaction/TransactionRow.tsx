"use client";
import React, { useState } from "react";
import { useForm, FieldValues } from "react-hook-form";
import { FormField } from "../../ui/FormField";

type Props = {
  id: string;
  date: string;
  category: string;
  amount: string;
  type: "INCOME" | "EXPENSE";
  comment?: string;
  onRightClick?: (e: React.MouseEvent) => void;
  onEdit?: () => void;
  isEditing?: boolean;
  onSave?: (data: {
    id: string;
    date: string;
    category: string;
    amount: string;
    type: "INCOME" | "EXPENSE";
    comment?: string;
  }) => void;
  onCancel?: () => void;
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
  isEditing,
  onSave,
  onCancel,
}: Props) => {
  const { register, handleSubmit } = useForm<FieldValues>({
    defaultValues: { date, category, amount, type, comment },
  });

  const [editDate, setEditDate] = useState(date);
  const [editCategory, setEditCategory] = useState(category);
  const [editAmount, setEditAmount] = useState(amount);
  const [editType, setEditType] = useState(type);
  const [editComment, setEditComment] = useState(comment || "");

  const onSubmit = (data: FieldValues) => {
    onSave!({
      id,
      date: editDate,
      category: editCategory,
      amount: editAmount,
      type: editType,
      comment: editComment,
    });
  };

  if (isEditing) {
    return (
      <tr
        className="border-t hover:bg-neutral-50 transition"
        onContextMenu={onRightClick}
      >
        <td className="px-4 py-2">
          <FormField
            name="date"
            label=""
            type="date"
            register={register}
            value={editDate}
            onChange={(e) => setEditDate(e.target.value)}
          />
        </td>
        <td className="px-4 py-2">
          <FormField
            name="category"
            label=""
            type="text"
            register={register}
            value={editCategory}
            onChange={(e) => setEditCategory(e.target.value)}
          />
        </td>
        <td className="px-4 py-2">
          <FormField
            name="amount"
            label=""
            type="number"
            register={register}
            value={editAmount}
            onChange={(e) => setEditAmount(e.target.value)}
          />
        </td>
        <td className="px-4 py-2">
          <FormField
            name="type"
            label=""
            type="select"
            register={register}
            options={[
              { value: "INCOME", label: "Доход" },
              { value: "EXPENSE", label: "Расход" },
            ]}
            value={editType}
            onChange={(e) =>
              setEditType(e.target.value as "INCOME" | "EXPENSE")
            }
          />
        </td>
        <td className="px-4 py-2">
          <FormField
            name="comment"
            label=""
            type="textarea"
            register={register}
            value={editComment}
            onChange={(e) => setEditComment(e.target.value)}
          />
        </td>
        <td className="px-4 py-2">
          <button onClick={handleSubmit(onSubmit)}>Сохранить</button>
          <button onClick={onCancel}>Закрыть</button>
        </td>
      </tr>
    );
  }

  const isIncome = type === "INCOME";
  const formattedDate = new Date(date).toLocaleDateString("ru-RU");

  return (
    <tr
      className="border-t hover:bg-neutral-50 transition"
      onContextMenu={onRightClick}
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
      <td className="px-4 py-2 text-neutral-500 ">{comment || "-"}</td>
    </tr>
  );
};
