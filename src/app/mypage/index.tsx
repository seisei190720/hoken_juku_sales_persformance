import { AuthUser } from "@aws-amplify/auth/cognito";
import Stack from "@mui/material/Stack";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Typography from "@mui/material/Typography";
import { FC, useCallback, useState } from "react";
import { useMockData } from "../mocks";
import AllApplicators from "./applicationList/AllApplicators";
import NotYetEstablished from "./applicationList/NotYetEstablished";
import Visitor from "./visitorList/Visitor";

type Props = {
  user: AuthUser;
};

type MyPageMode = "visitor" | "applicator" | "notYetEstablished";

const MyPage: FC<Props> = ({ user }) => {
  const { routeMst, consultContentMst, productMst, companyMst, statusMst } =
    useMockData();

  const [viewMode, setViewMode] = useState<MyPageMode>("visitor");

  const updateViewMode = useCallback(
    (event: React.MouseEvent<HTMLElement>, nextView: string) => {
      setViewMode(nextView as MyPageMode);
    },
    []
  );

  return (
    <>
      <Stack gap={2} sx={{ width: "100%" }}>
        <Typography variant="h4">{user.username}さんの営業成績</Typography>
        <ToggleButtonGroup
          color="primary"
          value={viewMode}
          exclusive
          onChange={updateViewMode}
          aria-label="Platform"
        >
          <ToggleButton value="visitor">来店者</ToggleButton>
          <ToggleButton value="applicator">申込者</ToggleButton>
          <ToggleButton value="notYetEstablished">未成立者</ToggleButton>
        </ToggleButtonGroup>

        {(() => {
          switch (viewMode) {
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
            case "notYetEstablished":
              return (
                <NotYetEstablished
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
      </Stack>
    </>
  );
};

export default MyPage;
