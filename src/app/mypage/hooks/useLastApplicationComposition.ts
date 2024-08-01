import { useSalesResultApi } from "@/app/api/useSalesResultApi";
import {
  Application,
  IndividualSalesResult,
  Member,
  RouteMst,
} from "@/app/types";
import { useCallback, useEffect, useMemo, useState } from "react";

export const useLastApplicationsComposition = (
  lastApp: IndividualSalesResult[]
) => {
  const lastApplicationData = useMemo(() => {
    if (!lastApp) return;
    const targetApplications = lastApp
      .flatMap((a) => a.applications)
      .filter((v) => v.status === "1");
    return {
      count: targetApplications.length,
      sum: targetApplications.reduce(
        (pre, { firstYearFee }) => pre + (firstYearFee ?? 0),
        0
      ),
    };
  }, [lastApp]);

  //   const memberLastApplicationDate = useMemo(() => {
  //     if (!lastApp) return;
  //     return members.map((m) => {
  //       const targetApp = lastApp
  //         .filter((a) => a.userId === m.id)
  //         .flatMap((f) => f.applications)
  //         .filter((v) => v.status === "1");
  //       return {
  //         name: m.name,
  //         count: targetApp.length,
  //         sum: targetApp.reduce(
  //           (pre, { firstYearFee }) => pre + (firstYearFee ?? 0),
  //           0
  //         ),
  //       };
  //     });
  //   }, [lastApp]);

  return {
    lastApplicationData,
    // memberLastApplicationDate,
  };
};
