import { useSalesResultApi } from "@/app/api/useSalesResultApi";
import {
  Application,
  IndividualSalesResult,
  Member,
  RouteMst,
} from "@/app/types";
import { useCallback, useEffect, useMemo, useState } from "react";

export const useLastApplicationsComposition = (
  // userId: string | null,
  members: Member[]
) => {
  const [lastApplicationResults, setLastApplicationResults] = useState<
    IndividualSalesResult[] | undefined
  >(undefined);
  const { salesResultData } = useSalesResultApi(
    //常にstore全体のデータを取ってくるようにする
    null, //いずれselectedMemberIdを入れる
    {
      status: "1",
      year: null,
      firstVisitDate: null,
    }
  );

  useEffect(() => {
    setLastApplicationResults(salesResultData);
  }, [salesResultData]);

  const lastApplicationData = useMemo(() => {
    if (!lastApplicationResults) return;
    const targetApplications = lastApplicationResults
      .flatMap((a) => a.applications)
      .filter((v) => v.status === "1");
    // const reducer = (pre: number | null, crr: number | null) => {
    //   if (pre === null) return crr;
    //   const crrValue = crr === null ? 0 : crr;
    //   return pre + crrValue;
    // };
    return {
      count: targetApplications.length,
      sum: targetApplications.reduce(
        (pre, { firstYearFee }) => pre + (firstYearFee ?? 0),
        0
      ),
    };
  }, [lastApplicationResults]);

  const memberLastApplicationDate = useMemo(() => {
    if (!lastApplicationResults) return;
    return members.map((m) => {
      const targetApp = lastApplicationResults
        .filter((a) => a.userId === m.id)
        .flatMap((f) => f.applications)
        .filter((v) => v.status === "1");
      return {
        name: m.name,
        count: targetApp.length,
        sum: targetApp.reduce(
          (pre, { firstYearFee }) => pre + (firstYearFee ?? 0),
          0
        ),
      };
    });
  }, [lastApplicationResults]);

  return {
    lastApplicationData,
    memberLastApplicationDate,
  };
};
