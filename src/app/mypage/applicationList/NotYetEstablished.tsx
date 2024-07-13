import { FC } from "react";
import { CompanyMst, ProductMst, StatusMst } from "@/app/types";
import ApplicationList from "./ApplicationList";
import { useSalesResultApi } from "@/app/api/useSalesResultApi";

type Props = {
  userId: string;
  productMst: ProductMst[];
  companyMst: CompanyMst[];
  statusMst: StatusMst[];
  canEdit: boolean;
};

const NotYetEstablished: FC<Props> = ({
  userId,
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

export default NotYetEstablished;
