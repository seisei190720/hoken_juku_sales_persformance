import { FC } from "react";
import { CompanyMst, ProductMst, StatusMst } from "@/app/types";
import { AuthUser } from "aws-amplify/auth";
import ApplicationList from "./ApplicationList";
import { useSalesResultApi } from "@/app/api/useSalesResultApi";

type Props = {
  user: AuthUser;
  targetMonth: string | null;
  productMst: ProductMst[];
  companyMst: CompanyMst[];
  statusMst: StatusMst[];
};

const TargetMonthApplicators: FC<Props> = ({
  user,
  targetMonth,
  productMst,
  companyMst,
  statusMst,
}) => {
  const { salesResultData, updateApplicationsData } = useSalesResultApi(
    user.userId,
    { status: null, firstVisitDate: targetMonth }
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

export default TargetMonthApplicators;
