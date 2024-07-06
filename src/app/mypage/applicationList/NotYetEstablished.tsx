import { FC } from "react";
import {
  CompanyMst,
  IndividualSalesResult,
  ProductMst,
  StatusMst,
} from "@/app/types";
import { AuthUser } from "aws-amplify/auth";
import ApplicationList from "./applicationList";
import { useSalesResultApi } from "@/app/api/useSalesResultApi";

type Props = {
  user: AuthUser;
  productMst: ProductMst[];
  companyMst: CompanyMst[];
  statusMst: StatusMst[];
};

const NotYetEstablished: FC<Props> = ({
  user,
  productMst,
  companyMst,
  statusMst,
}) => {
  const { salesResultData, updateApplicationsData } = useSalesResultApi(
    user.userId,
    { status: "未成立", firstVisitDate: null }
  );
  return (
    <>
      <ApplicationList
        user={user}
        productMst={productMst}
        companyMst={companyMst}
        statusMst={statusMst}
        salesResultData={salesResultData}
        updateApplicationsData={updateApplicationsData}
      />
    </>
  );
};

export default NotYetEstablished;
