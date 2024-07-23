import {
  Application,
  ContractBudget,
  ProductMst,
  yearMonth,
} from "@/app/types";
import { useCallback, useMemo } from "react";

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
  contractBudgetData: ContractBudget[]
) => {
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

  const budgetAndAchievementData: BudgetAndAchievementType[] | undefined =
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
        const achievedPercent = (constractSum / budget) * 100;
        const resultPercent = Math.round(achievedPercent * 10) / 10;
        const resultPercentUnderHundred =
          resultPercent > 100 ? 100 : resultPercent;
        const excessSum = constractSum - budget < 0 ? 0 : constractSum - budget;
        return {
          name: y.name,
          実績: constractSum - excessSum, // グラフで表示するように、予算額をmaxとしている
          実実績: constractSum,
          未達額: budget - constractSum < 0 ? 0 : budget - constractSum,
          超過額: constractSum - budget < 0 ? 0 : constractSum - budget,
          予算: budget,
          達成率: isNaN(resultPercent) ? 0 : resultPercentUnderHundred,
        };
      });
    }, [applicationData, contractBudgetData, getTargetMonthDateApp]);

  const constractSumData = useMemo(() => {
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

  const constractCountData = useMemo(() => {
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

  const calcAchievementPercent = useCallback(
    (
      targetMonthContract: ContractBudget | undefined,
      achivementSum: number
    ) => {
      if (!targetMonthContract) return 0;

      const achievedPercent = (achivementSum / targetMonthContract.value) * 100;
      const resultPercent = Math.round(achievedPercent * 10) / 10;
      const resultPercentUnderHundred =
        resultPercent > 100 ? 100 : resultPercent;
      return isNaN(resultPercent) ? 0 : resultPercentUnderHundred;
    },
    []
  );

  const allBudgetAndAchievementData = useMemo(() => {
    if (!budgetAndAchievementData || !contractBudgetData) return;

    const achivementSum = budgetAndAchievementData
      .map((b) => b.実実績)
      .reduce((pre, crr) => pre + crr, 0);
    const targetYearContract = getYearlyContract(contractBudgetData);

    return {
      achivementSum: achivementSum,
      achivementPercent: calcAchievementPercent(
        targetYearContract,
        achivementSum
      ),
    };
  }, [budgetAndAchievementData, contractBudgetData]);

  return {
    budgetAndAchievementData,
    allBudgetAndAchievementData,
    constractSumData,
    constractCountData,
  };
};
