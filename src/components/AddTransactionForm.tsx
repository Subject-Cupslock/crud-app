"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormField } from "./UI/FormField";
import { PrimaryButton } from "./UI/PrimaryButton";

const schema = z.object({
  date: z.string().nonempty("Укажите дату"),
  category: z.string().min(1, "Категория обязательна"),
  amount: z.coerce.number().positive("Сумма должна быть положительной"),
  type: z.enum(["INCOME", "EXPENSE"]),
  comment: z.string().optional(),
});

type AddTransactionFormProps = {
  onSuccess?: () => void;
};

type FormData = z.infer<typeof schema>;

export const AddTransactionForm = ({ onSuccess }: AddTransactionFormProps) => {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
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
      onSuccess?.();
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

      <FormField name="date" label="Дата" type="date" register={register} />
      <FormField name="category" label="Категория" register={register} />
      <FormField
        name="amount"
        label="Сумма"
        type="number"
        register={register}
      />
      <FormField
        name="type"
        label="Тип"
        type="select"
        register={register}
        options={[
          { value: "INCOME", label: "Доход" },
          { value: "EXPENSE", label: "Расход" },
        ]}
      />
      <FormField
        name="comment"
        label="Коментарий"
        type="textarea"
        register={register}
      />

      <PrimaryButton type="submit" loading={mutation.isPending}>
        {mutation.isPending ? "Сохранение...." : "Добавить"}
      </PrimaryButton>
    </form>
  );
};
