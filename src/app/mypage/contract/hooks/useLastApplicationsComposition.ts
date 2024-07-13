import { useSalesResultApi } from "@/app/api/useSalesResultApi";
import { Application, IndividualSalesResult, RouteMst } from "@/app/types";
import {
  amber,
  deepOrange,
  green,
  lightGreen,
  orange,
  teal,
} from "@mui/material/colors";
import { useCallback, useEffect, useMemo, useState } from "react";

export const useLastApplicationsComposition = (userId: string) => {
  const [lastApplicationResults, setLastApplicationResults] = useState<
    IndividualSalesResult[] | undefined
  >(undefined);
  const { salesResultData } = useSalesResultApi(userId, {
    status: "1",
    year: null,
    firstVisitDate: null,
  });

  useEffect(() => {
    setLastApplicationResults(salesResultData);
  }, [salesResultData]);

  const lastApplicationData = useMemo(() => {
    if (!lastApplicationResults) return;
    const applications = lastApplicationResults.flatMap((a) => a.applications);
    // const reducer = (pre: number | null, crr: number | null) => {
    //   if (pre === null) return crr;
    //   const crrValue = crr === null ? 0 : crr;
    //   return pre + crrValue;
    // };
    return {
      count: applications.filter((v) => v.status === "1").length,
      //   sum: applications.flatMap((v) => v.firstYearFee).reduce(reducer),
    };
  }, [lastApplicationResults]);

  return lastApplicationData;
};
