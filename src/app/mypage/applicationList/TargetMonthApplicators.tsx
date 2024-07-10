import { FC } from "react";
import { CompanyMst, ProductMst, StatusMst } from "@/app/types";
import ApplicationList from "./ApplicationList";
import { useSalesResultApi } from "@/app/api/useSalesResultApi";

type Props = {
  userId: string;
  targetMonth: string | null;
  productMst: ProductMst[];
  companyMst: CompanyMst[];
  statusMst: StatusMst[];
  canEdit: boolean;
};

const TargetMonthApplicators: FC<Props> = ({
  userId,
  targetMonth,
  productMst,
  companyMst,
  statusMst,
  canEdit,
}) => {
  const { salesResultData, updateSalesResultData: updateSalesResultData } =
    useSalesResultApi(userId, {
      status: null,
      firstVisitDate: targetMonth,
    });
  return (
    <>
      <ApplicationList
        productMst={productMst}
        companyMst={companyMst}
        statusMst={statusMst}
        salesResultData={salesResultData}
        updateApplicationsData={updateSalesResultData}
        canEdit={canEdit}
      />
    </>
  );
};

export default TargetMonthApplicators;
