"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormField } from "@/ui/FormField";
import { PrimaryButton } from "@/ui/PrimaryButton";

const schema = z.object({
  date: z.string().nonempty("Укажите дату"),
  category: z.string().min(1, "Категория обязательна"),
  amount: z.coerce.number().positive("Сумма должна быть положительной"),
  type: z.enum(["INCOME", "EXPENSE"]),
  comment: z.string().optional(),
});

type FormSchema = z.infer<typeof schema>;

type Props = {
  initialValues?: FormSchema;
  onSubmit: (data: FormSchema) => void;
  onCancel?: () => void;
  isSubmitting?: boolean;
};

export const TransactionForm = ({
  initialValues,
  onSubmit,
  onCancel,
  isSubmitting,
}: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(schema),
    defaultValues: initialValues || {
      date: "",
      category: "",
      amount: 0,
      type: "EXPENSE",
      comment: "",
    },
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white border p-6 space-y-5 text-sm text-neutral-800"
    >
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
        label="Комментарий"
        type="textarea"
        register={register}
      />

      <div className="flex gap-2">
        <PrimaryButton type="submit" loading={isSubmitting}>
          {isSubmitting ? "Сохранение..." : "Сохранить"}
        </PrimaryButton>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="text-sm text-neutral-500 hover:underline"
          >
            Отмена
          </button>
        )}
      </div>
    </form>
  );
};
