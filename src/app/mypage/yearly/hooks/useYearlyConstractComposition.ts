import { calcPercent } from "@/app/hooks/util";
import {
  Application,
  ContractBudget,
  ProductMst,
  yearMonth,
} from "@/app/types";
import { useCallback, useEffect, useMemo, useState } from "react";

export type BudgetAndAchievementType = {
  name: string;
  実績: number;
  実実績: number;
  未達額: number;
  超過額: number;
  予算: number;
  達成率: number;
};

export type YearlyConstractSumAndCountType = {
  month: string;
  生保: number;
  損保: number;
  合計: number;
};

export const useYearlyConstractComposition = (
  applicationData: Application[] | undefined,
  productMst: ProductMst[],
  contractBudgetData: ContractBudget[],
  userId: string
) => {
  const [targetContractBudget, setTargetContractBudget] = useState<
    ContractBudget | null | undefined
  >(undefined);

  useEffect(() => {
    if (contractBudgetData !== undefined) {
      setTargetContractBudget(
        contractBudgetData.find((c: ContractBudget) => (c.userId = userId)) ||
          null
      );
    }
  }, [contractBudgetData]);

  const getTargetMonthDateApp = useCallback(
    (target: Application[], monthDate: string) =>
      target.filter((r) => {
        if (r.establishDate === null) return false;
        return r.establishDate.indexOf(monthDate) !== -1;
      }),
    []
  );
  const getTargetMonthYearContract = useCallback(
    (target: ContractBudget[], monthYear: string) =>
      target.find((r) => {
        if (r.month === null) return false;
        return r.month.indexOf(monthYear) !== -1;
      }),
    []
  );

  const getYearlyContract = useCallback(
    (target: ContractBudget[]) => target.find((r) => r.month === null),
    []
  );

  const resolveProductKind = useCallback(
    (v: string | null) => {
      return productMst.find((r) => r.id == v)?.kind;
    },
    [productMst]
  );

  const lifeApplications = useCallback(
    (target: Application[]) =>
      target.filter((v) => resolveProductKind(v.product) === "life"),
    []
  );

  const nonLifeApplications = useCallback(
    (target: Application[]) =>
      target.filter((v) => resolveProductKind(v.product) === "nonLife"),
    []
  );

  const budgetAndAchievement: BudgetAndAchievementType[] | undefined =
    useMemo(() => {
      if (!applicationData || !contractBudgetData) return;
      return yearMonth.map((y) => {
        const targetMonthApp = getTargetMonthDateApp(
          applicationData,
          y.keyMonthDate
        );
        const constractSum = targetMonthApp
          .filter((t) => t.status === "2")
          .reduce((pre, { firstYearFee }) => pre + (firstYearFee ?? 0), 0);
        const targetMonthContract = getTargetMonthYearContract(
          contractBudgetData,
          y.keyMonthYear
        );
        const budget = !targetMonthContract ? 0 : targetMonthContract.value;
        const excessSum = constractSum - budget < 0 ? 0 : constractSum - budget;
        return {
          name: y.name,
          実績: constractSum - excessSum, // グラフで表示するように、予算額をmaxとしている
          実実績: constractSum,
          未達額: budget - constractSum < 0 ? 0 : budget - constractSum,
          超過額: constractSum - budget < 0 ? 0 : constractSum - budget,
          予算: budget,
          達成率: calcPercent(constractSum, budget, false),
        };
      });
    }, [applicationData, contractBudgetData, getTargetMonthDateApp]);

  const constractSum = useMemo(() => {
    if (!applicationData) return;
    return yearMonth.map((y) => {
      const targetMonthApp = getTargetMonthDateApp(
        applicationData,
        y.keyMonthDate
      );
      const targetFilteredApp = targetMonthApp.filter((t) => t.status === "2");
      return {
        month: y.name,
        生保: lifeApplications(targetFilteredApp).reduce(
          (pre, { firstYearFee }) => pre + (firstYearFee ?? 0),
          0
        ),
        損保: nonLifeApplications(targetFilteredApp).reduce(
          (pre, { firstYearFee }) => pre + (firstYearFee ?? 0),
          0
        ),
        合計: targetFilteredApp.reduce(
          (pre, { firstYearFee }) => pre + (firstYearFee ?? 0),
          0
        ),
      };
    });
  }, [
    applicationData,
    getTargetMonthDateApp,
    lifeApplications,
    nonLifeApplications,
  ]);

  const constractCount = useMemo(() => {
    if (!applicationData) return;
    return yearMonth.map((y) => {
      const targetMonthApp = getTargetMonthDateApp(
        applicationData,
        y.keyMonthDate
      );
      const targetFilteredApp = targetMonthApp.filter((t) => t.status === "2");
      return {
        month: y.name,
        生保: lifeApplications(targetFilteredApp).length,
        損保: nonLifeApplications(targetFilteredApp).length,
        合計: targetFilteredApp.length,
      };
    });
  }, [
    applicationData,
    getTargetMonthDateApp,
    lifeApplications,
    nonLifeApplications,
  ]);

  const sumAndPercentByProduct = useMemo(() => {
    if (!budgetAndAchievement || !constractSum) return;

    const achivementSum = budgetAndAchievement
      .map((b) => b.実実績)
      .reduce((pre, crr) => pre + crr, 0);

    return {
      achivementSum: achivementSum,
      achivementPercent:
        targetContractBudget === undefined || targetContractBudget === null
          ? 0
          : calcPercent(achivementSum, targetContractBudget.value, true),
      lifeAchivementSum: constractSum
        .map((c) => c.生保)
        .reduce((pre, crr) => pre + crr, 0),
      nonLifeAchivementSum: constractSum
        .map((c) => c.損保)
        .reduce((pre, crr) => pre + crr, 0),
    };
  }, [budgetAndAchievement, constractSum, targetContractBudget]);

  const contractCountByProduct = useMemo(() => {
    if (!constractCount) return;
    return {
      all: constractCount.map((c) => c.合計).reduce((pre, crr) => pre + crr, 0),
      life: constractCount
        .map((c) => c.生保)
        .reduce((pre, crr) => pre + crr, 0),
      nonLife: constractCount
        .map((c) => c.損保)
        .reduce((pre, crr) => pre + crr, 0),
    };
  }, [constractCount]);

  return {
    budgetAndAchievement,
    sumAndPercentByProduct,
    contractCountByProduct,
    constractSum,
    constractCount,
    targetContractBudget,
  };
};
