import { FC, useCallback, useMemo } from "react";
import {
  CompanyMst,
  IndividualSalesResult,
  ProductMst,
  StatusMst,
} from "@/app/types";
import ApplicationList from "./ApplicationList";
import { useSalesResultApi } from "@/app/api/useSalesResultApi";
import { KeyedMutator } from "swr";

type Props = {
  userId: string;
  mutateSalesResultData: KeyedMutator<any>;
  productMst: ProductMst[];
  companyMst: CompanyMst[];
  statusMst: StatusMst[];
  canEdit: boolean;
};

const InProgressApplicationList: FC<Props> = ({
  userId,
  mutateSalesResultData,
  productMst,
  companyMst,
  statusMst,
  canEdit,
}) => {
  const { salesResultData, updateSalesResultData } = useSalesResultApi(userId, {
    status: "1",
    year: null,
    firstVisitDate: null,
  });
  const updateSalesResultDataAndMutate = useCallback(
    async (newData: IndividualSalesResult) => {
      await updateSalesResultData(newData);
      mutateSalesResultData();
    },
    [updateSalesResultData, mutateSalesResultData]
  );

  const filteredSalesResultData = useMemo(() => {
    if (!salesResultData) return;
    return salesResultData.filter((v: IndividualSalesResult) =>
      v.applications.some((a) => a.status === "1")
    );
  }, [salesResultData]);

  return (
    <ApplicationList
      salesResultData={filteredSalesResultData}
      updateApplicationsData={updateSalesResultDataAndMutate}
      productMst={productMst}
      companyMst={companyMst}
      statusMst={statusMst}
      canEdit={canEdit}
    />
  );
};

export default InProgressApplicationList;
