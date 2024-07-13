import { FC, useCallback, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import {
  Application,
  CompanyMst,
  ConsultContentMst,
  IndividualSalesResult,
  NewVisitor,
  ProductMst,
  RouteMst,
  StatusMst,
} from "@/app/types";
import Stack from "@mui/material/Stack";
import StoreConstract from "./StoreConstract";
import StoreAchievement from "./StoreAchievement";

type Props = {
  userId: string;
  salesResultData: IndividualSalesResult[] | undefined;
  applicationData: Application[] | undefined;
};

type StorePageMode = "achievement" | "contract";

const StoreResults: FC<Props> = ({
  userId,
  salesResultData,
  applicationData,
}) => {
  const [viewMode, setViewMode] = useState<StorePageMode>("achievement");

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
              return <StoreAchievement salesResultData={salesResultData} />;
            case "contract":
              return <StoreConstract applicationData={applicationData} />;
            default:
              return <></>;
          }
        })()}
      </Box>
    </Box>
  );
};

export default StoreResults;
