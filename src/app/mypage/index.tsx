import { AuthUser } from "@aws-amplify/auth/cognito";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import { FC, useEffect, useMemo, useState } from "react";
import Button from "@mui/material/Button";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import { red } from "@mui/material/colors";
import TopPage from "./top/topPage";
import MonthlyPage from "./monthly/MonthlyPage";
import YearlyPage from "./yearly/YearlyPage";
import { resolveYear, useSalesResultApi } from "../api/useSalesResultApi";
import { useMockData } from "../mocks";
import { useLastApplicationsComposition } from "./hooks/useLastApplicationComposition";
import { useContractBudgetApi } from "../api/useContractBudgetApi";
import { useApplicationApi } from "../api/useApplicationApi";
import { useTopicAchievementComposition } from "./top/hooks/useTopicAchievementComposition";

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

  const crrMonth = useMemo(() => dayjs().format("YYYY-MM"), []);

  const { contractBudgetData } = useContractBudgetApi({
    userId: userId,
    year: resolveYear(crrMonth),
    month: null,
  });
  const { applicationData } = useApplicationApi({
    userId: userId,
    year: resolveYear(crrMonth),
    establishDate: null,
  });

  const topicData = useTopicAchievementComposition(
    contractBudgetData,
    applicationData
  );
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
                  topicData={topicData}
                />
              );
            case "monthly":
              return (
                <MonthlyPage
                  userId={userId}
                  canEdit={true}
                  topicData={topicData}
                  lastAppComposition={lastAppComposition}
                />
              );
            case "yearly":
              return (
                <YearlyPage
                  userId={userId}
                  canEdit={true}
                  topicData={topicData}
                  lastAppComposition={lastAppComposition}
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
export default Mypage;
