import { AuthUser } from "@aws-amplify/auth/cognito";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import { FC, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import { red } from "@mui/material/colors";
import TopPage from "./top/topPage";
import MonthlyPage from "./monthly/MonthlyPage";
import YearlyPage from "./yearly/YearlyPage";
import { useSalesResultApi } from "../api/useSalesResultApi";
import { useMockData } from "../mocks";
import { useLastApplicationsComposition } from "./hooks/useLastApplicationComposition";

type Props = {
  userId: string;
  canEdit: boolean;
};

type ToggleMenu = "top" | "monthly" | "yearly";
const Mypage: FC<Props> = ({ userId, canEdit }) => {
  const mstData = useMockData();
  const [toggleMenu, setToggleMenu] = useState<ToggleMenu>("top");
  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newToggleMenu: string
  ) => {
    setToggleMenu(newToggleMenu as ToggleMenu);
  };
  const {
    salesResultData: lastApp,
    updateSalesResultData: updateLastApp,
    mutate: mutateLastApp,
  } = useSalesResultApi(userId, {
    status: "1",
    year: null,
    firstVisitDate: null,
  });

  const lastAppComposition = useLastApplicationsComposition(lastApp);
  return (
    <>
      <Stack>
        <Typography variant="h5">マイページ</Typography>
        <Stack direction="row" justifyContent="center" pb={2}>
          <ToggleButtonGroup
            color="primary"
            size="small"
            value={toggleMenu}
            exclusive
            onChange={handleChange}
            aria-label="Platform"
          >
            <ToggleButton value="top">トップページ</ToggleButton>
            <ToggleButton value="monthly">月別成果</ToggleButton>
            <ToggleButton value="yearly">年度別成果</ToggleButton>
          </ToggleButtonGroup>
        </Stack>
        {(() => {
          switch (toggleMenu) {
            case "top":
              return (
                <TopPage
                  userId={userId}
                  mstData={mstData}
                  canEdit={true}
                  inProgressApp={lastApp}
                  updateInProgressApp={updateLastApp}
                  lastAppComposition={lastAppComposition}
                />
              );
            case "monthly":
              return <MonthlyPage userId={userId} canEdit={true} />;
            case "yearly":
              return <YearlyPage userId={userId} canEdit={true} />;
            default:
              return <></>;
          }
        })()}
      </Stack>
    </>
  );
};
export default Mypage;
