"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const schema = z.object({
  date: z.string().nonempty(),
  category: z.string().min(1),
  amount: z.coerce.number().positive(),
  type: z.enum(["INCOME", "EXPENSE"]),
  comment: z.string().optional(),
});

export const AddTransactionForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: FormData) => {
      const res = await fetch("/api/transactions", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error("Ошибка при создании транзакции");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      reset();
    },
  });

  return (
    <form onSubmit={handleSubmit((data) => mutation.mutate(data))}>
      <input type="date" {...register("date")} />
      <input type="text" placeholder="Категория" {...register("category")} />
      <input type="number" placeholder="Сумма" {...register("amount")} />
      <select {...register("type")}>
        <option value="INCOME">Доход</option>
        <option value="EXPENSE">Расход</option>
      </select>
      <textarea placeholder="Комментарий" {...register("comment")} />
      <button type="submit">Добавить</button>
    </form>
  );
};
