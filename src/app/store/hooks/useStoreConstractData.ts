import { useSalesResultApi } from "@/app/api/useSalesResultApi";
import {
  Application,
  ContractBudget,
  IndividualSalesResult,
  Member,
} from "@/app/types";
import { BudgetAndAchievementType } from "@/app/yearly/hooks/useYearlyConstractComposition";
import { amber } from "@mui/material/colors";
import { useMemo } from "react";
import { CountAndPercentType } from "./useStoreAchievementData";

export type ConstractSouceType = {
  name: string;
  sum: number;
  inProgressAppSum: number;
  inProgressAppCount: number;
};
export const useStoreConstractData = (
  lastSalesResultData: IndividualSalesResult[] | undefined,
  applicationData: Application[] | undefined,
  member: Member[],
  memberConstractBudgetData: ContractBudget[]
) => {
  const tempConstractSumAndAchievementRateData:
    | CountAndPercentType[]
    | undefined = useMemo(() => {
    if (!applicationData) return;
    return member.map((m) => {
      const targetApp = applicationData.filter((a) => a.userId === m.id);
      return {
        name: m.name,
        件数: targetApp
          .map((t) =>
            t.status === "2" && t.firstYearFee !== null ? t.firstYearFee : 0
          )
          .reduce((pre, crr) => pre + crr, 0),
        全体: 0, //使っていないので、適当に
        率: 0,
      };
    });
  }, [applicationData, member]);

  const constractSumAndAchievementRateData:
    | BudgetAndAchievementType[]
    | undefined = useMemo(() => {
    if (!applicationData || !memberConstractBudgetData) return;
    return member.map((m) => {
      const targetApp = applicationData.filter((a) => a.userId === m.id);
      const constractSum = targetApp
        .filter((t) => t.status === "2")
        .reduce((pre, { firstYearFee }) => pre + (firstYearFee ?? 0), 0);
      const targetBudget = memberConstractBudgetData.find(
        (b) => b.userId === m.id
      )?.value;
      if (!targetBudget) {
        return {
          name: m.name,
          実績: constractSum,
          実実績: constractSum,
          未達額: 0,
          超過額: 0,
          予算: 0,
          達成率: 0,
        };
      }
      const achievedPercent = (constractSum / targetBudget) * 100;
      const resultPercent = Math.round(achievedPercent * 10) / 10;
      const resultPercentUnderHundred =
        resultPercent > 100 ? 100 : resultPercent;
      const excessSum =
        constractSum - targetBudget < 0 ? 0 : constractSum - targetBudget;
      return {
        name: m.name,
        実績: constractSum - excessSum, // グラフで表示するように、予算額をmaxとしている
        実実績: constractSum,
        未達額:
          targetBudget - constractSum < 0 ? 0 : targetBudget - constractSum,
        超過額:
          constractSum - targetBudget < 0 ? 0 : constractSum - targetBudget,
        予算: targetBudget,
        達成率: isNaN(resultPercent) ? 0 : resultPercentUnderHundred,
      };
    });
  }, [applicationData, memberConstractBudgetData]);

  const storeConstractSum: number | undefined = useMemo(() => {
    if (!applicationData) return;
    return applicationData
      .filter((a) => a.status === "2")
      .reduce((pre, { firstYearFee }) => pre + (firstYearFee ?? 0), 0);
  }, [applicationData]);

  const inProgressApplicationCount = useMemo(() => {
    if (!lastSalesResultData) return;
    const targetApplications = lastSalesResultData
      .flatMap((s) => s.applications)
      .filter((a) => a.status === "1");
    return {
      count: targetApplications.length,
      sum: targetApplications.reduce(
        (pre, { firstYearFee }) => pre + (firstYearFee ?? 0),
        0
      ),
    };
  }, [lastSalesResultData]);

  //TODO: statusクエリだけでリクエストを投げて取得できるようにバックエンドを実装する
  const constractSouceData: ConstractSouceType[] | undefined = useMemo(() => {
    if (!constractSumAndAchievementRateData || !lastSalesResultData) return;
    const targetApplications = lastSalesResultData.flatMap((s) => {
      return s.applications.map((a) => {
        return {
          ...a,
          userId: s.userId,
        };
      });
    });
    return constractSumAndAchievementRateData.map((c) => {
      const targetUser = member.find((m) => m.name === c.name);
      if (targetUser === undefined)
        return {
          name: c.name,
          sum: c.実実績,
          inProgressAppSum: 0,
          inProgressAppCount: 0,
        };
      const inProgressApp = targetApplications
        .filter((a) => a.userId === targetUser.id)
        .filter((v) => v.status === "1");
      return {
        name: c.name,
        sum: c.実実績,
        inProgressAppSum: inProgressApp.reduce(
          (pre, { firstYearFee }) => pre + (firstYearFee ?? 0),
          0
        ),
        inProgressAppCount: inProgressApp.length,
      };
    });
  }, [lastSalesResultData, constractSumAndAchievementRateData, member]);

  return {
    storeConstractSum,
    constractSumAndAchievementRateData,
    inProgressApplicationCount,
    constractSouceData,
  };
};
