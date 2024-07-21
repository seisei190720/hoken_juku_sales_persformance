import { FC, useCallback, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import {
  Application,
  CompanyMst,
  ConsultContentMst,
  ContractBudget,
  IndividualSalesResult,
  ProductMst,
  RouteMst,
  StatusMst,
} from "@/app/types";
import Stack from "@mui/material/Stack";
import StoreConstract from "./StoreConstract";
import StoreAchievement from "./StoreAchievement";
import { useMockData } from "../mocks";
import { useContractBudgetApi } from "../api/useContractBudgetApi";

type Props = {
  userId: string;
  targetMonth: string | null;
  salesResultData: IndividualSalesResult[] | undefined;
  inProgressSalesResultData: IndividualSalesResult[] | undefined;
  applicationData: Application[] | undefined;
  routeMst: RouteMst[];
  consultContentMst: ConsultContentMst[];
  productMst: ProductMst[];
  companyMst: CompanyMst[];
  statusMst: StatusMst[];
  storeConstractBudgetData: ContractBudget[];
  postStoreConstractBudgetData: (newData: ContractBudget) => Promise<void>;
  memberConstractBudgetData: ContractBudget[];
};

type StorePageMode = "achievement" | "contract";

const StoreResults: FC<Props> = ({
  userId,
  targetMonth,
  salesResultData,
  inProgressSalesResultData,
  applicationData,
  routeMst,
  consultContentMst,
  productMst,
  companyMst,
  statusMst,
  storeConstractBudgetData,
  postStoreConstractBudgetData,
  memberConstractBudgetData,
}) => {
  const [viewMode, setViewMode] = useState<StorePageMode>("achievement");

  const { members } = useMockData();
  const updateViewMode = useCallback(
    (event: React.SyntheticEvent, nextView: string) => {
      setViewMode(nextView as StorePageMode);
    },
    []
  );
  const a11yProps = (index: number) => {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  };

  return (
    <Box ml="10px" mr="10px">
      <Stack direction="row" alignItems="center">
        <Tabs
          sx={{
            marginLeft: "10px",
            marginBottom: "8px",
          }}
          value={viewMode}
          onChange={updateViewMode}
          aria-label="sales-result-view-mode-tab"
        >
          <Tab label="成果" value="achievement" {...a11yProps(0)} />
          <Tab label="契約実績" value="contract" {...a11yProps(0)} />
        </Tabs>
      </Stack>
      <Box
        sx={{
          minHeight: "calc(100vh - 200px)",
          background: "#f5f5f5",
        }}
        borderRadius={"12px"}
      >
        {(() => {
          switch (viewMode) {
            case "achievement":
              return (
                <StoreAchievement
                  salesResultData={salesResultData}
                  members={members}
                  routeMst={routeMst}
                  consultContentMst={consultContentMst}
                  productMst={productMst}
                  companyMst={companyMst}
                  statusMst={statusMst}
                />
              );
            case "contract":
              return (
                <StoreConstract
                  userId={userId}
                  targetMonth={targetMonth}
                  inProgressSalesResultData={inProgressSalesResultData}
                  applicationData={applicationData}
                  members={members}
                  storeConstractBudgetData={storeConstractBudgetData}
                  postStoreConstractBudgetData={postStoreConstractBudgetData}
                  memberConstractBudgetData={memberConstractBudgetData}
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

export default StoreResults;
