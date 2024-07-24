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
  Member,
  ProductMst,
  RouteMst,
  StatusMst,
} from "@/app/types";
import Stack from "@mui/material/Stack";
import { useMockData } from "../../mocks";
import YearlyAchievementResult from "./YearlyAchievementResult";
import YearlyConstractResult from "./YearlyConstractResult";

type Props = {
  userId: string;
  selecetedMember: Member | "all";
  targetYear: string | null;
  salesResultData: IndividualSalesResult[] | undefined;
  applicationData: Application[] | undefined;
  routeMst: RouteMst[];
  consultContentMst: ConsultContentMst[];
  productMst: ProductMst[];
  companyMst: CompanyMst[];
  statusMst: StatusMst[];
  contractBudgetData: ContractBudget[];
  postContractBudgetData: (newData: ContractBudget) => Promise<void>;
};

type YearlyPageMode = "achievement" | "contract";

const YearlyResults: FC<Props> = ({
  userId,
  selecetedMember,
  targetYear,
  salesResultData,
  applicationData,
  routeMst,
  consultContentMst,
  productMst,
  companyMst,
  statusMst,
  contractBudgetData,
  postContractBudgetData,
}) => {
  const [viewMode, setViewMode] = useState<YearlyPageMode>("achievement");
  const { members } = useMockData();

  const updateViewMode = useCallback(
    (event: React.SyntheticEvent, nextView: string) => {
      setViewMode(nextView as YearlyPageMode);
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
                <YearlyAchievementResult
                  salesResultData={salesResultData}
                  members={members}
                  routeMst={routeMst}
                />
              );
            case "contract":
              return (
                <YearlyConstractResult
                  selecetedMember={selecetedMember}
                  targetYear={targetYear}
                  applicationData={applicationData}
                  productMst={productMst}
                  contractBudgetData={contractBudgetData}
                  postContractBudgetData={postContractBudgetData}
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

export default YearlyResults;