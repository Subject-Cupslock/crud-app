import { useQuery } from "@tanstack/react-query";
import { getTransactions } from "@/app/api/transactions";

export const useTransactions = (p0: { page: number; limit: number; }) => {
  return useQuery({
    queryKey: ["transactions"],
    queryFn: () => getTransactions(),
  });
};
