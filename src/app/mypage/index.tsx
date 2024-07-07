import { AuthUser } from "@aws-amplify/auth/cognito";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { FC, useCallback, useState } from "react";
import { useMockData } from "../mocks";
import AllApplicators from "./applicationList/AllApplicators";
import NotYetEstablished from "./applicationList/NotYetEstablished";
import Visitor from "./visitorList/Visitor";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Summary from "./summary/Summary";

type Props = {
  user: AuthUser;
};

type MyPageMode = "summary" | "visitor" | "applicator";

const MyPage: FC<Props> = ({ user }) => {
  const { routeMst, consultContentMst, productMst, companyMst, statusMst } =
    useMockData();

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
    <>
      <Stack gap={2} sx={{ width: "100%" }}>
        <Typography variant="h4">{user.username}さんの営業成績</Typography>
        <Box
          ml="15px"
          mr="15px"
          sx={{
            borderBottom: 1,
            borderColor: "divider",
          }}
        >
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
              borderBottom: 1,
              borderColor: "divider",
              background: "#f5f5f5",
            }}
            borderRadius={"12px"}
          >
            {(() => {
              switch (viewMode) {
                case "summary":
                  return (
                    <Summary
                      user={user}
                      routeMst={routeMst}
                      productMst={productMst}
                    />
                  );
                case "visitor":
                  return (
                    <Visitor
                      user={user}
                      routeMst={routeMst}
                      productMst={productMst}
                      companyMst={companyMst}
                      consultContentMst={consultContentMst}
                    />
                  );
                case "applicator":
                  return (
                    <AllApplicators
                      user={user}
                      productMst={productMst}
                      companyMst={companyMst}
                      statusMst={statusMst}
                    />
                  );
                default:
                  return <></>;
              }
            })()}
          </Box>
        </Box>
      </Stack>
    </>
  );
};

export default MyPage;
