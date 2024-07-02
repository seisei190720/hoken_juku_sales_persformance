import { AuthUser } from "@aws-amplify/auth/cognito";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Typography from "@mui/material/Typography";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { useSalesResultApi } from "../api/useSalesResultApi";
import { useMockData } from "../mocks";
import ApplicationList from "./applicationList/applicationList";
import HeaderArea from "./visitorList/HeaderArea";
import VisitorList from "./visitorList/VisitorList";

type Props = {
  user: AuthUser;
};

type MyPageMode = "visitor" | "applicator";

const MyPage: FC<Props> = ({ user }) => {
  const { routeMst, consultContentMst, productMst, companyMst } = useMockData();
  const { salesResultData, postVisitorData, updateApplicationsData } =
    useSalesResultApi(user.userId);
  const [viewMode, setViewMode] = useState<MyPageMode>("visitor");

  const updateViewMode = useCallback(
    (event: React.MouseEvent<HTMLElement>, nextView: string) => {
      setViewMode(nextView as MyPageMode);
    },
    []
  );

  const isLoading = useMemo(
    () => salesResultData === undefined,
    [salesResultData]
  );

  if (isLoading) return <CircularProgress />;
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
          <ToggleButton value="visitor">来店者一覧</ToggleButton>
          <ToggleButton value="applicator">申込者一覧</ToggleButton>
        </ToggleButtonGroup>

        {viewMode === "visitor" ? (
          <>
            <HeaderArea
              salesResultData={salesResultData || []}
              postVisitorData={postVisitorData}
              routeMst={routeMst}
              consultContentMst={consultContentMst}
            />
            <VisitorList
              salesResults={salesResultData || []}
              productMst={productMst}
              companyMst={companyMst}
              updateApplicationsData={updateApplicationsData}
            />
          </>
        ) : (
          <ApplicationList salesResults={salesResultData || []} />
        )}
      </Stack>
    </>
  );
};

export default MyPage;
