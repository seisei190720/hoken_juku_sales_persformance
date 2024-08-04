import { IndividualSalesResult } from "@/app/types";
import { useMemo } from "react";

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

  return {
    lastApplicationData,
  };
};
