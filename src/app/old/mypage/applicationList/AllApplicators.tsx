import { FC, useState } from "react";
import {
  CompanyMst,
  IndividualSalesResult,
  ProductMst,
  StatusMst,
} from "@/app/types";
import Stack from "@mui/material/Stack";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import ApplicationList from "../../../mypage/components/ApplicationList";
import { KeyedMutator } from "swr";
import InProgressApplicationList from "./InProgressApplicationList";

type Props = {
  userId: string;
  salesResultData: IndividualSalesResult[] | undefined;
  updateSalesResultData: (newData: IndividualSalesResult) => Promise<void>;
  mutateSalesResultData: KeyedMutator<any>;
  productMst: ProductMst[];
  companyMst: CompanyMst[];
  statusMst: StatusMst[];
  canEdit: boolean;
};

const AllApplicators: FC<Props> = ({
  userId,
  salesResultData,
  updateSalesResultData,
  mutateSalesResultData,
  productMst,
  companyMst,
  statusMst,
  canEdit,
}) => {
  return (
    <>
      <Stack gap={2}>
        {/* {showInProgressApp ? (
          <InProgressApplicationList
            userId={userId}
            mutateSalesResultData={mutateSalesResultData}
            productMst={productMst}
            companyMst={companyMst}
            statusMst={statusMst}
            canEdit={canEdit}
          />
        ) : ( */}
        <ApplicationList
          salesResultData={salesResultData}
          updateApplicationsData={updateSalesResultData}
          productMst={productMst}
          companyMst={companyMst}
          statusMst={statusMst}
          canEdit={canEdit}
        />
        {/* )} */}
      </Stack>
    </>
  );
};

export default AllApplicators;
