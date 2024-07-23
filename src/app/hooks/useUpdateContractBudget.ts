import { useCallback, useEffect, useState } from "react";
import { ContractBudget } from "../types";

export const useUpdateContractBudget = (
  userId: string,
  targetMonth: string | null,
  targetYear: string | null,
  contractBudget: ContractBudget | null,
  postContractBudgetData: (newData: ContractBudget) => Promise<void>
) => {
  const [updatedBudget, setUpdateBudget] = useState<number | null>(null);
  useEffect(() => {
    if (!contractBudget) return;
    setUpdateBudget(contractBudget.value);
  }, [contractBudget, setUpdateBudget]);

  const updateContractBudgetDate = useCallback(
    (newData: number) => {
      setUpdateBudget(newData);
    },
    [setUpdateBudget]
  );

  const submitUpdatedBudget = useCallback(() => {
    if (updatedBudget === null) return;
    postContractBudgetData({
      userId: userId,
      year: targetYear || "",
      month: targetMonth,
      value: updatedBudget,
    });
  }, [contractBudget, updatedBudget, postContractBudgetData]);

  return {
    updatedBudget,
    updateContractBudgetDate,
    submitUpdatedBudget,
  };
};
