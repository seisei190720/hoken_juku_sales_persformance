import { Application, IndividualSalesResult, ProductMst } from "@/app/types";
import { green, orange } from "@mui/material/colors";
import { useCallback, useEffect, useMemo, useState } from "react";

export const useApplicatorSummaryComposition = (
  results: IndividualSalesResult[] | undefined,
  productMst: ProductMst[]
) => {
  const [salesData, setSalesData] = useState<
    IndividualSalesResult[] | undefined
  >(undefined);
  const [applicationData, setApplicationData] = useState<
    Application[] | undefined
  >(undefined);

  useEffect(() => {
    if (!results) return;
    setSalesData(results);
    setApplicationData(results.flatMap((v) => v.applications));
  }, [results]);
  const calculateTotalFee = (applications: Application[]): number => {
    return applications.reduce(
      (sum, item) => sum + (item.firstYearFee ?? 0),
      0
    );
  };

  const resolveProductKind = useCallback(
    (v: string | null) => {
      return productMst.find((r) => r.name == v)?.kind;
    },
    [productMst]
  );

  const lifeApplications = useMemo(
    () =>
      applicationData?.filter((v) => resolveProductKind(v.product) === "life"),
    [applicationData, resolveProductKind]
  );

  const nonLifeApplications = useMemo(
    () =>
      applicationData?.filter(
        (v) => resolveProductKind(v.product) === "nonLife"
      ),
    [salesData, resolveProductKind]
  );

  const getProductAmountByName = useCallback(
    (name: string) => {
      if (!applicationData) return;
      return calculateTotalFee(
        applicationData.filter((a) => a.product === name)
      );
    },
    [applicationData]
  );

  const productBarChartData = useMemo(() => {
    if (!applicationData || productMst.length === 0) return;
    return productMst.map((r) => {
      return {
        name: r.name,
        "実績(円)": getProductAmountByName(r.name) || 0,
        color: r.kind === "life" ? green[400] : orange[400],
      };
    });
  }, [applicationData, getProductAmountByName, productMst]);

  const fistYearFeeData = useMemo(() => {
    if (!applicationData || !lifeApplications || !nonLifeApplications) return;
    return {
      all: calculateTotalFee(applicationData),
      life: calculateTotalFee(lifeApplications),
      nonLife: calculateTotalFee(nonLifeApplications),
    };
  }, [applicationData, lifeApplications, nonLifeApplications]);

  const constractData = useMemo(() => {
    if (!applicationData || !lifeApplications || !nonLifeApplications) return;

    return {
      all: applicationData.length,
      life: lifeApplications.length,
      nonLife: nonLifeApplications.length,
    };
  }, [applicationData, lifeApplications, nonLifeApplications]);

  const thankyouData = useMemo(() => {
    if (!salesData) return;
    const thankyouCount = salesData.filter((r) => r.thankyou).length;
    const applicatorCount = salesData.filter(
      (r) => r.applications.length !== 0
    ).length;
    const thankyouPercent = (thankyouCount / applicatorCount) * 100;
    const resultPercent = Math.round(thankyouPercent * 10) / 10;
    return {
      percent: isNaN(resultPercent) ? 0 : resultPercent,
      count: thankyouCount,
      all: applicatorCount,
    };
  }, [salesData]);

  const lastApplicationCount = useMemo(() => {
    if (!applicationData) return;
    return applicationData.filter((v) => v.status === "未成立").length;
  }, [applicationData]);

  return {
    productBarChartData,
    fistYearFeeData,
    constractData,
    thankyouData,
    lastApplicationCount,
  };
};
