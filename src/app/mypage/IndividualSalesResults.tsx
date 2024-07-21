import { FC, useCallback, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import AllApplicators from "./applicationList/AllApplicators";
import Visitor from "./visitorList/Visitor";
import {
  CompanyMst,
  ConsultContentMst,
  IndividualSalesResult,
  NewVisitor,
  ProductMst,
  RouteMst,
  StatusMst,
} from "@/app/types";
import Stack from "@mui/material/Stack";
import { KeyedMutator } from "swr";
import Constract from "./contract/Contract";
import Achievement from "./achievement/Achievement";

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
  canEdit,
}) => {
  const [viewMode, setViewMode] = useState<MyPageMode>("visitor");

  const updateViewMode = useCallback(
    (event: React.SyntheticEvent, nextView: string) => {
      setViewMode(nextView as MyPageMode);
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
          <Tab label="来店者" value="visitor" {...a11yProps(1)} />
          <Tab label="申込者" value="applicator" {...a11yProps(2)} />
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
                <AllApplicators
                  userId={userId}
                  salesResultData={salesResultData}
                  updateSalesResultData={updateSalesResultData}
                  mutateSalesResultData={mutateSalesResultData}
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
