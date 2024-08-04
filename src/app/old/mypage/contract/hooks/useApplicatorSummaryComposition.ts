import { calcPercent } from "@/app/hooks/util";
import { Application, ContractBudget, ProductMst } from "@/app/types";
import { green, orange } from "@mui/material/colors";
import { useCallback, useEffect, useMemo, useState } from "react";

export const useApplicatorSummaryComposition = (
  applicationData: Application[] | undefined,
  productMst: ProductMst[],
  contractBudgetData: ContractBudget[],
  userId: string
) => {
  const [targetContract, setTargetContract] = useState<
    ContractBudget | null | undefined
  >(undefined);

  useEffect(() => {
    if (contractBudgetData !== undefined) {
      setTargetContract(
        contractBudgetData.find((c: ContractBudget) => (c.userId = userId)) ||
          null
      );
    }
  }, [contractBudgetData]);

  const calculateTotalFee = (applications: Application[]): number => {
    return applications.reduce(
      (sum, item) => sum + (item.firstYearFee ?? 0),
      0
    );
  };

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

  const getProductAmountByName = useCallback(
    (productId: string) => {
      if (!applicationData) return;
      return calculateTotalFee(
        applicationData
          .filter((a) => a.status === "2")
          .filter((a) => a.product === productId)
      );
    },
    [applicationData]
  );

  const productBarChartData = useMemo(() => {
    if (productMst.length === 0) return;
    return productMst.map((r) => {
      return {
        name: r.name,
        "実績(円)": getProductAmountByName(r.id) || 0,
        color: r.kind === "life" ? green[400] : orange[400],
      };
    });
  }, [getProductAmountByName, productMst]);

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
      all: applicationData.filter((a) => a.status === "2").length,
      life: lifeApplications.length,
      nonLife: nonLifeApplications.length,
    };
  }, [applicationData, lifeApplications, nonLifeApplications]);

  const contractAchievementRate = useMemo(() => {
    if (fistYearFeeData === undefined || targetContract === undefined) return;

    if (targetContract === null) return 0;
    return calcPercent(fistYearFeeData.all, targetContract.value);
  }, [fistYearFeeData, targetContract]);

  return {
    productBarChartData,
    fistYearFeeData,
    constractData,
    targetContract,
    contractAchievementRate,
  };
};
