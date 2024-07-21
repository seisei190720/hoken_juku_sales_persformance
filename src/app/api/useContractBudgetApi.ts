import { ContractBudget } from "../types";
import useSWR from "swr";
import axios from "axios";
import { useCallback } from "react";
import { resolveYear } from "./useSalesResultApi";
// const devUrl =
//   "https://1us1ed23t2.execute-api.ap-northeast-1.amazonaws.com/hoken_juku_sales_result/sales-results/applications";

const prodUrl =
  "https://jiv06b7gz7.execute-api.ap-northeast-1.amazonaws.com/prod_hoken_juku/contract-budget";

const fetcher = async ([url, userId, year, month]: [
  string,
  string | null,
  string,
  string | null
]) => {
  const response = await axios.get(url, {
    params: {
      userId,
      year,
      month,
    },
  });

  if (response.data === undefined) return;
  return response.data.map((d: ContractBudget) => {
    return {
      userId: d.userId,
      year: d.year,
      month: d.month,
      value: d.value,
    };
  });
};

export const useContractBudgetApi = (param: {
  userId: string | null;
  year: string | null;
  month: string | null;
}) => {
  const {
    data: contractBudgetData,
    error,
    mutate,
  } = useSWR(
    param.year === null
      ? null
      : [prodUrl, param.userId, param.year, param.month],
    fetcher
  );

  const postContractBudgetData = useCallback(
    async (newData: ContractBudget) => {
      try {
        await axios.post(prodUrl, newData);
        await mutate([newData], false);
      } catch (error) {
        console.error("Error posting data:", error);
      }
    },
    [mutate]
  );

  return {
    contractBudgetData,
    postContractBudgetData,
    error,
    mutate,
  };
};
