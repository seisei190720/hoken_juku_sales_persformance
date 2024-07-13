import { useSalesResultApi } from "@/app/api/useSalesResultApi";
import { Application, IndividualSalesResult, Member } from "@/app/types";
import { amber } from "@mui/material/colors";
import { useEffect, useMemo, useState } from "react";
import { CountAndPercentType } from "./useStoreAchievementData";

export type ConstractSouceType = {
  name: string;
  sum: number;
  inProgressAppCount: number;
};
export const useStoreConstractData = (
  salesResultData: IndividualSalesResult[] | undefined,
  applicationData: Application[] | undefined,
  member: Member[]
) => {
  const constractSumAndAchievementRateData: CountAndPercentType[] | undefined =
    useMemo(() => {
      if (!applicationData) return;
      return member.map((m) => {
        const targetApp = applicationData.filter((a) => a.userId === m.id);
        const sumOfFirstYearFee = targetApp
          .map((t) => (t.firstYearFee === null ? 0 : t.firstYearFee))
          .reduce((pre, crr) => pre + crr, 0);
        return {
          name: m.name,
          件数: sumOfFirstYearFee,
          率: 0,
        };
      });
    }, [applicationData, member]);

  const storeConstractSum: number | undefined = useMemo(() => {
    if (!applicationData) return;
    return applicationData
      .map((t) => (t.firstYearFee === null ? 0 : t.firstYearFee))
      .reduce((pre, crr) => pre + crr, 0);
  }, [applicationData]);

  //TODO: statusクエリだけでリクエストを投げて取得できるようにバックエンドを実装する
  const inProgressApplicationCount: number | undefined = useMemo(() => {
    if (!salesResultData) return;
    return salesResultData
      .flatMap((s) => s.applications)
      .filter((a) => a.status === "1").length;
  }, [salesResultData]);

  //TODO: statusクエリだけでリクエストを投げて取得できるようにバックエンドを実装する
  const constractSouceData: ConstractSouceType[] | undefined = useMemo(() => {
    if (!constractSumAndAchievementRateData || !salesResultData) return;
    const targetApplications = salesResultData.flatMap((s) => {
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
          sum: c.件数,
          inProgressAppCount: 0,
        };
      const inProgressApp = targetApplications
        .filter((a) => a.userId === targetUser.id)
        .filter((v) => v.status === "1");
      return {
        name: c.name,
        sum: c.件数,
        inProgressAppCount: inProgressApp.length,
      };
    });
  }, [salesResultData, constractSumAndAchievementRateData, member]);

  return {
    storeConstractSum,
    constractSumAndAchievementRateData,
    inProgressApplicationCount,
    constractSouceData,
  };
};
