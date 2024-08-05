import { calcPercent } from "@/app/hooks/util";
import { TopicBudgetAndAchievementType } from "@/app/mypage/top/hooks/useTopicAchievementComposition";
import {
  Application,
  ContractBudget,
  IndividualSalesResult,
  Member,
} from "@/app/types";
import dayjs from "dayjs";

import { useCallback, useMemo } from "react";

export type BudgetAndAchievementExpectByMemberType = {
  name: string;
  予算: number;
  実績: number;
  見込額: number;
  不足額: number;
};

export const useStoreTopComposition = (
  members: Member[],
  inProgressSalesResultData: IndividualSalesResult[] | undefined,
  monthBudgetAndAchievementData: TopicBudgetAndAchievementType | undefined,
  memberContractBudgetData: ContractBudget[] | undefined,
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

  const storeBudgetAndAchievementExpect:
    | TopicBudgetAndAchievementType
    | undefined = useMemo(() => {
    if (!inProgressSalesResultData || !monthBudgetAndAchievementData) {
      return;
    }
    const expectSum = inProgressSalesResultData
      .flatMap((a) => a.applications)
      .filter((v) => v.status === "1")
      .reduce((pre, { firstYearFee }) => pre + (firstYearFee ?? 0), 0);
    const shortFallAmount =
      monthBudgetAndAchievementData.予算 -
      (monthBudgetAndAchievementData.実績 + expectSum);
    return {
      実績: monthBudgetAndAchievementData.実績,
      予算: monthBudgetAndAchievementData.予算,
      未達額: shortFallAmount < 0 ? 0 : shortFallAmount,
      達成率: calcPercent(
        monthBudgetAndAchievementData.実績 + expectSum,
        monthBudgetAndAchievementData.予算,
        true
      ),
      見込額: expectSum,
    };
  }, [inProgressSalesResultData, monthBudgetAndAchievementData]);

  const budgetAndAchievementExpectByMember:
    | BudgetAndAchievementExpectByMemberType[]
    | undefined = useMemo(() => {
    if (
      !applicationData ||
      !memberContractBudgetData ||
      !inProgressSalesResultData
    )
      return;
    const crrMontStr = dayjs().format("YYYY-MM");
    const targetConstract = getTargetMonthDateApp(applicationData, crrMontStr);

    return members.map((m) => {
      const targetApp = targetConstract.filter((a) => a.userId === m.id);
      const constractSum = targetApp
        .filter((t) => t.status === "2")
        .reduce((pre, { firstYearFee }) => pre + (firstYearFee ?? 0), 0);
      const targetBudget = memberContractBudgetData.find(
        (b) => b.userId === m.id
      )?.value;
      const budgetSum = targetBudget === undefined ? 0 : targetBudget;
      const expectSum = inProgressSalesResultData
        .filter((f) => f.userId === m.id)
        .flatMap((a) => a.applications)
        .filter((v) => v.status === "1")
        .reduce((pre, { firstYearFee }) => pre + (firstYearFee ?? 0), 0);

      const shortFallAmount = budgetSum - (constractSum + expectSum);
      return {
        name: m.name,
        予算: budgetSum,
        実績: constractSum,
        見込額: expectSum,
        不足額: shortFallAmount < 0 ? 0 : shortFallAmount,
      };
    });
  }, [
    members,
    inProgressSalesResultData,
    memberContractBudgetData,
    applicationData,
  ]);
  return {
    storeBudgetAndAchievementExpect,
    budgetAndAchievementExpectByMember,
  };
};
