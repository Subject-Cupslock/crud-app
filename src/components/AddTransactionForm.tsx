"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const schema = z.object({
  date: z.string().nonempty("Укажите дату"),
  category: z.string().min(1, "Категория обязательна"),
  amount: z.coerce.number().positive("Сумма должна быть положительной"),
  type: z.enum(["INCOME", "EXPENSE"]),
  comment: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export const AddTransactionForm = () => {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

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
    <form
      onSubmit={handleSubmit((data) => mutation.mutate(data))}
      className="max-w-md mx-auto bg-white border border-neutral-200 p-6 space-y-5 text-sm text-neutral-800"
    >
      <h2 className="text-xl font-semibold tracking-tight mb-2">
        Новая транзакция
      </h2>

      <div>
        <label className="block mb-1 font-medium">Дата</label>
        <input
          type="date"
          {...register("date")}
          className="w-full border border-neutral-300 px-3 py-2 bg-white focus:outline-none focus:border-black"
        />
        {errors.date && (
          <p className="text-red-500 text-xs mt-1">{errors.date.message}</p>
        )}
      </div>

      <div>
        <label className="block mb-1 font-medium">Категория</label>
        <input
          type="text"
          {...register("category")}
          placeholder="Транспорт, Продукты и т.д."
          className="w-full border border-neutral-300 px-3 py-2 bg-white focus:outline-none focus:border-black"
        />
        {errors.category && (
          <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>
        )}
      </div>

      <div>
        <label className="block mb-1 font-medium">Сумма</label>
        <input
          type="number"
          {...register("amount")}
          placeholder="0.00"
          className="w-full border border-neutral-300 px-3 py-2 bg-white focus:outline-none focus:border-black"
        />
        {errors.amount && (
          <p className="text-red-500 text-xs mt-1">{errors.amount.message}</p>
        )}
      </div>

      <div>
        <label className="block mb-1 font-medium">Тип</label>
        <select
          {...register("type")}
          className="w-full border border-neutral-300 px-3 py-2 bg-white focus:outline-none focus:border-black"
        >
          <option value="">Выберите</option>
          <option value="INCOME">Доход</option>
          <option value="EXPENSE">Расход</option>
        </select>
        {errors.type && (
          <p className="text-red-500 text-xs mt-1">{errors.type.message}</p>
        )}
      </div>

      <div>
        <label className="block mb-1 font-medium">Комментарий</label>
        <textarea
          {...register("comment")}
          placeholder="Необязательно"
          className="w-full border border-neutral-300 px-3 py-2 bg-white focus:outline-none focus:border-black resize-none"
          rows={3}
        />
      </div>

      <button
        type="submit"
        disabled={mutation.isPending}
        className="w-full bg-black text-white py-2 px-4 font-medium tracking-wide uppercase disabled:opacity-50
             transition-all duration-150 ease-in-out
             hover:brightness-110 hover:scale-[1.02]
             active:scale-[0.98] cursor-pointer"
      >
        {mutation.isPending ? "Сохраняем..." : "Добавить"}
      </button>
    </form>
  );
};
