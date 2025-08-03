import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  updateTransaction,
  deleteTransaction,
  createTransaction,
} from "@/app/api/transactions";

export const useTransactionMutations = () => {
  const client = useQueryClient();

  const create = useMutation({
    mutationFn: createTransaction,
    onSuccess: () => client.invalidateQueries({ queryKey: ["transactions"] }),
  });

  const update = useMutation({
    mutationFn: updateTransaction,
    onSuccess: () => client.invalidateQueries({ queryKey: ["transactions"] }),
  });

  const remove = useMutation({
    mutationFn: deleteTransaction,
    onSuccess: () => client.invalidateQueries({ queryKey: ["transactions"] }),
  });

  return { create, update, remove };
};
