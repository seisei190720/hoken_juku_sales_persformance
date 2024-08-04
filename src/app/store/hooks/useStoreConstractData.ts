import {
  Application,
  ContractBudget,
  IndividualSalesResult,
  Member,
  ProductMst,
} from "@/app/types";
import { BudgetAndAchievementType } from "@/app/mypage/yearly/hooks/useYearlyConstractComposition";
import { useCallback, useEffect, useMemo, useState } from "react";
import { calcPercent } from "@/app/hooks/util";

export type ConstractSouceType = {
  name: string;
  sum: number;
  inProgressAppSum: number;
  inProgressAppCount: number;
};
export const useStoreConstractData = (
  lastSalesResultData: IndividualSalesResult[] | undefined,
  applicationData: Application[] | undefined,
  productMst: ProductMst[],
  member: Member[],
  storeConstractBudgetData: ContractBudget[],
  memberConstractBudgetData: ContractBudget[]
) => {
  const [targetStoreContractBudget, setTargetStoreContractBudget] = useState<
    ContractBudget | undefined
  >(undefined);

  useEffect(() => {
    if (
      storeConstractBudgetData !== undefined &&
      storeConstractBudgetData.length > 0
    ) {
      setTargetStoreContractBudget(
        storeConstractBudgetData.find(
          (c: ContractBudget) => (c.userId = "1") || null
        )
      );
    }
  }, [storeConstractBudgetData, setTargetStoreContractBudget]);

  const resolveProductKind = useCallback(
    (v: string | null) => {
      return productMst.find((r) => r.id == v)?.kind;
    },
    [productMst]
  );

  const lifeApplications = useMemo(
    () =>
      applicationData
        ?.filter((a) => a.status === "2")
        .filter((v) => resolveProductKind(v.product) === "life"),
    [applicationData, resolveProductKind]
  );

  const nonLifeApplications = useMemo(
    () =>
      applicationData
        ?.filter((a) => a.status === "2")
        .filter((v) => resolveProductKind(v.product) === "nonLife"),
    [applicationData, resolveProductKind]
  );

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
        達成率: calcPercent(constractSum, targetBudget, true),
      };
    });
  }, [applicationData, memberConstractBudgetData]);

  const constractSumByProduct = useMemo(() => {
    if (
      !applicationData ||
      !targetStoreContractBudget ||
      !lifeApplications ||
      !nonLifeApplications
    ) {
      return;
    }
    const achivementSum = applicationData
      .filter((a) => a.status === "2")
      .reduce((pre, { firstYearFee }) => pre + (firstYearFee ?? 0), 0);
    return {
      achivementSum: achivementSum,
      achivementPercent: calcPercent(
        achivementSum,
        targetStoreContractBudget.value,
        true
      ),
      life: lifeApplications.reduce(
        (pre, { firstYearFee }) => pre + (firstYearFee ?? 0),
        0
      ),
      nonLife: nonLifeApplications.reduce(
        (pre, { firstYearFee }) => pre + (firstYearFee ?? 0),
        0
      ),
    };
  }, [
    applicationData,
    targetStoreContractBudget,
    lifeApplications,
    nonLifeApplications,
  ]);

  const constractCountByProduct = useMemo(() => {
    if (!applicationData || !lifeApplications || !nonLifeApplications) return;
    return {
      all: applicationData.filter((a) => a.status === "2").length,
      life: lifeApplications.length,
      nonLife: nonLifeApplications.length,
    };
  }, [applicationData, lifeApplications, nonLifeApplications]);

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
    constractSumByProduct, //実績
    constractCountByProduct,
    constractSumAndAchievementRateData, //メンバーごとグラフ用
    constractSouceData, //メンバーごとグラフ根拠用
    targetStoreContractBudget, //予算
  };
};
