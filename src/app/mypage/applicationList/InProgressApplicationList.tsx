import { FC, useCallback } from "react";
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

  return (
    <ApplicationList
      salesResultData={salesResultData}
      updateApplicationsData={updateSalesResultDataAndMutate}
      productMst={productMst}
      companyMst={companyMst}
      statusMst={statusMst}
      canEdit={canEdit}
    />
  );
};

export default InProgressApplicationList;
