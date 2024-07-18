import {
  Application,
  CompanyMst,
  ConsultContentMst,
  IndividualSalesResult,
  Member,
  ProductMst,
  RouteMst,
  StatusMst,
  yearMonth,
} from "@/app/types";
import { useCallback, useMemo } from "react";

export type YearlyBudgetAndAchievementType = {
  month: string;
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
  lastSalesResultData: IndividualSalesResult[] | undefined,
  applicationData: Application[] | undefined,
  //   routeMst: RouteMst[]
  // consultContentMst: ConsultContentMst[],
  productMst: ProductMst[]
  // companyMst: CompanyMst[],
  // statusMst: StatusMst[]
) => {
  const getTargetMonthData = useCallback(
    (target: Application[], month: string) =>
      target.filter((r) => {
        if (r.establishDate === null) return false;
        return r.establishDate.indexOf(month) !== -1;
      }),
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

  const budgetAndAchievementData: YearlyBudgetAndAchievementType[] | undefined =
    useMemo(() => {
      if (!applicationData) return;
      return yearMonth.map((y) => {
        const targetMonthApp = getTargetMonthData(applicationData, y.keyMonth);
        const constractSum = targetMonthApp
          .filter((t) => t.status === "2")
          .reduce((pre, { firstYearFee }) => pre + (firstYearFee ?? 0), 0);
        //一時的に予算額を100,000円と仮定する(予算を入力てできるようになったら修正する)
        const budget = 700000;
        const achievedPercent = (constractSum / budget) * 100;
        const resultPercent = Math.round(achievedPercent * 10) / 10;
        const resultPercentUnderHundred =
          resultPercent > 100 ? 100 : resultPercent;
        const excessSum = constractSum - budget < 0 ? 0 : constractSum - budget;
        return {
          month: y.name,
          実績: constractSum - excessSum, // グラフで表示するように、予算額をmaxとしている
          実実績: constractSum,
          未達額: budget - constractSum < 0 ? 0 : budget - constractSum,
          超過額: constractSum - budget < 0 ? 0 : constractSum - budget,
          予算: budget,
          達成率: isNaN(resultPercent) ? 0 : resultPercentUnderHundred,
        };
      });
    }, [applicationData, getTargetMonthData]);

  const constractSumData = useMemo(() => {
    if (!applicationData) return;
    return yearMonth.map((y) => {
      const targetMonthApp = getTargetMonthData(applicationData, y.keyMonth);
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
    getTargetMonthData,
    lifeApplications,
    nonLifeApplications,
  ]);

  const constractCountData = useMemo(() => {
    if (!applicationData) return;
    return yearMonth.map((y) => {
      const targetMonthApp = getTargetMonthData(applicationData, y.keyMonth);
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
    getTargetMonthData,
    lifeApplications,
    nonLifeApplications,
  ]);

  const allBudgetAndAchievementData = useMemo(() => {
    if (!budgetAndAchievementData) return;
    return {
      achivementSum: budgetAndAchievementData
        .map((b) => b.実実績)
        .reduce((pre, crr) => pre + crr, 0),
      budgetSum: 1000000, //TODO 予算
    };
  }, [budgetAndAchievementData]);

  return {
    budgetAndAchievementData,
    allBudgetAndAchievementData,
    constractSumData,
    constractCountData,
  };
};
