import { FC } from "react";
import Box from "@mui/material/Box";
import Visitor from "./visitor/Visitor";
import {
  CompanyMst,
  ConsultContentMst,
  IndividualSalesResult,
  NewVisitor,
  ProductMst,
  RouteMst,
  StatusMst,
} from "@/app/types";
import { KeyedMutator } from "swr";
import Constract from "./contract/Contract";
import Achievement from "./achievement/Achievement";
import { useContractBudgetApi } from "../../api/useContractBudgetApi";
import { resolveYear } from "../../api/useSalesResultApi";
import { useApplicationApi } from "@/app/api/useApplicationApi";
import ApplicationList from "../components/ApplicationList";

type Props = {
  userId: string;
  targetMonth: string | null;
  salesResultData: IndividualSalesResult[] | undefined;
  postVisitorData: (newData: NewVisitor) => Promise<void>;
  updateSalesResultData: (newData: IndividualSalesResult) => Promise<void>;
  deleteSalesResultData: (deleteTarget: IndividualSalesResult) => Promise<void>;
  mutateSalesResultData: KeyedMutator<any>;
  routeMst: RouteMst[];
  productMst: ProductMst[];
  companyMst: CompanyMst[];
  consultContentMst: ConsultContentMst[];
  statusMst: StatusMst[];
  viewMode: MyPageMode;
  canEdit: boolean;
};

type MyPageMode = "visitor" | "applicator" | "achievement" | "contract";

const IndividualSalesResults: FC<Props> = ({
  userId,
  targetMonth,
  salesResultData,
  postVisitorData,
  updateSalesResultData,
  deleteSalesResultData,
  mutateSalesResultData,
  routeMst,
  productMst,
  companyMst,
  consultContentMst,
  statusMst,
  viewMode,
  canEdit,
}) => {
  const { contractBudgetData, postContractBudgetData } = useContractBudgetApi({
    userId: userId,
    year: resolveYear(targetMonth),
    month: targetMonth,
  });
  const { applicationData } = useApplicationApi({
    userId: userId,
    year: resolveYear(targetMonth),
    establishDate: targetMonth,
  });

  return (
    <Box>
      <Box
        sx={{
          minHeight: "calc(100vh - 525px)",
          background: "#f5f5f5",
        }}
        ml="10px"
        mr="10px"
        borderRadius={"12px"}
        p={3}
      >
        {(() => {
          switch (viewMode) {
            case "visitor":
              return (
                <Visitor
                  userId={userId}
                  salesResultData={salesResultData}
                  postVisitorData={postVisitorData}
                  updateSalesResultData={updateSalesResultData}
                  deleteSalesResultData={deleteSalesResultData}
                  routeMst={routeMst}
                  productMst={productMst}
                  companyMst={companyMst}
                  consultContentMst={consultContentMst}
                  canEdit={canEdit}
                />
              );
            case "applicator":
              return (
                <ApplicationList
                  salesResultData={salesResultData}
                  updateApplicationsData={updateSalesResultData}
                  productMst={productMst}
                  companyMst={companyMst}
                  statusMst={statusMst}
                  canEdit={canEdit}
                />
              );
            case "achievement":
              return (
                <Achievement
                  userId={userId}
                  salesResultData={salesResultData}
                  routeMst={routeMst}
                  productMst={productMst}
                />
              );
            case "contract":
              return (
                <Constract
                  userId={userId}
                  targetMonth={targetMonth}
                  productMst={productMst}
                  canEdit={canEdit}
                  contractBudgetData={contractBudgetData}
                  postContractBudgetData={postContractBudgetData}
                  applicationData={applicationData}
                />
              );
            default:
              return <></>;
          }
        })()}
      </Box>
    </Box>
  );
};

export default IndividualSalesResults;
