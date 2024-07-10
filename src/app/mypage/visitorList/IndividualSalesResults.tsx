import { FC, useCallback, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Summary from "../summary/Summary";
import AllApplicators from "../applicationList/AllApplicators";
import Visitor from "./Visitor";
import {
  CompanyMst,
  ConsultContentMst,
  ProductMst,
  RouteMst,
  StatusMst,
} from "@/app/types";

type Props = {
  userId: string;
  routeMst: RouteMst[];
  productMst: ProductMst[];
  companyMst: CompanyMst[];
  consultContentMst: ConsultContentMst[];
  statusMst: StatusMst[];
  canEdit: boolean;
};

type MyPageMode = "summary" | "visitor" | "applicator";

const IndividualSalesResults: FC<Props> = ({
  userId,
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
      <Tabs
        sx={{
          marginLeft: "10px",
          marginBottom: "8px",
        }}
        value={viewMode}
        onChange={updateViewMode}
        aria-label="sales-result-view-mode-tab"
      >
        <Tab label="サマリ" value="summary" {...a11yProps(0)} />
        <Tab label="来店者" value="visitor" {...a11yProps(1)} />
        <Tab label="申込者" value="applicator" {...a11yProps(2)} />
      </Tabs>

      <Box
        sx={{
          background: "#f5f5f5",
        }}
        borderRadius={"12px"}
      >
        {(() => {
          switch (viewMode) {
            case "summary":
              return (
                <Summary
                  userId={userId}
                  routeMst={routeMst}
                  productMst={productMst}
                />
              );
            case "visitor":
              return (
                <Visitor
                  userId={userId}
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
                  productMst={productMst}
                  companyMst={companyMst}
                  statusMst={statusMst}
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
