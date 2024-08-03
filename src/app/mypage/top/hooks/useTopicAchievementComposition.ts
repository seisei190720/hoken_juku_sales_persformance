import {
  Application,
  ContractBudget,
  ProductMst,
  yearMonth,
} from "@/app/types";
import dayjs from "dayjs";
import { useCallback, useMemo } from "react";

export type TopicBudgetAndAchievementType = {
  実績: number;
  予算: number;
  未達額: number;
  達成率: number;
  見込額?: number;
  // 実実績: number;
  // 超過額: number;
};

export const useTopicAchievementComposition = (
  contractBudgetData: ContractBudget[],
  applicationData: Application[] | undefined
) => {
  const getTargetMonthDateApp = useCallback(
    (target: Application[], monthDate: string) =>
      target.filter((r) => {
        if (r.establishDate === null) return false;
        return r.establishDate.indexOf(monthDate) !== -1;
      }),
    []
  );

  const moldResultData = useCallback(
    (contractBudget: number, contractSum: number) => {
      const achievedPercent = (contractSum / contractBudget) * 100;
      const resultPercent = Math.round(achievedPercent * 10) / 10;
      const resultPercentUnderHundred =
        resultPercent > 100 ? 100 : resultPercent;
      return {
        実績: contractSum,
        予算: contractBudget,
        未達額:
          contractBudget - contractSum < 0 ? 0 : contractBudget - contractSum,
        達成率: isNaN(resultPercent) ? 0 : resultPercentUnderHundred,
      };
    },
    []
  );

  const yearBudgetAndAchievementData:
    | TopicBudgetAndAchievementType
    | undefined = useMemo(() => {
    if (!applicationData || !contractBudgetData) return;
    const targetContractBudget = contractBudgetData.find(
      (c) => c.month === null
    )?.value;
    const constractSum = applicationData
      .filter((t) => t.status === "2")
      .reduce((pre, { firstYearFee }) => pre + (firstYearFee ?? 0), 0);
    if (!targetContractBudget)
      return {
        実績: constractSum,
        予算: 0,
        未達額: 0,
        達成率: 0,
      };
    return moldResultData(targetContractBudget, constractSum);
  }, [applicationData, contractBudgetData]);

  const monthBudgetAndAchievementData:
    | TopicBudgetAndAchievementType
    | undefined = useMemo(() => {
    if (!applicationData || !contractBudgetData) return;
    const crrMontStr = dayjs().format("YYYY-MM");
    const targetContractBudget = contractBudgetData.find(
      (c) => c.month === crrMontStr
    )?.value;
    const targetConstract = getTargetMonthDateApp(applicationData, crrMontStr);
    const constractSum = targetConstract
      .filter((t) => t.status === "2")
      .reduce((pre, { firstYearFee }) => pre + (firstYearFee ?? 0), 0);
    if (!targetContractBudget)
      return {
        実績: constractSum,
        予算: 0,
        未達額: 0,
        達成率: 0,
      };
    return moldResultData(targetContractBudget, constractSum);
  }, [applicationData, contractBudgetData]);

  return {
    yearBudgetAndAchievementData,
    monthBudgetAndAchievementData,
  };
};
