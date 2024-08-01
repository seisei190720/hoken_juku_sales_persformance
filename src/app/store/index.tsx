import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import dayjs from "dayjs";
import { FC, useEffect, useMemo, useState } from "react";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import { useMockData } from "../mocks";
import YearlyPage from "../mypage/yearly/YearlyPage";
import { resolveYear, useSalesResultApi } from "../api/useSalesResultApi";
import { useContractBudgetApi } from "../api/useContractBudgetApi";
import { useApplicationApi } from "../api/useApplicationApi";
import { useTopicAchievementComposition } from "../mypage/top/hooks/useTopicAchievementComposition";
import { useLastApplicationsComposition } from "../mypage/hooks/useLastApplicationComposition";
import StoreMonthlyPage from "./StoreMonthlyPage";
import { IndividualSalesResult } from "../types";

type Props = {
  userId: string;
  canEdit: boolean;
  inProgressSalesResultData: IndividualSalesResult[] | undefined;
};

type ToggleMenu = "top" | "monthly" | "yearly";

const StorePage: FC<Props> = ({
  userId,
  canEdit,
  inProgressSalesResultData,
}) => {
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
  } = useSalesResultApi(null, {
    status: "1",
    year: null,
    firstVisitDate: null,
  });
  const crrMonth = useMemo(() => dayjs().format("YYYY-MM"), []);

  const { contractBudgetData } = useContractBudgetApi({
    userId: "1",
    year: resolveYear(crrMonth),
    month: null,
  });
  const { applicationData } = useApplicationApi({
    userId: null,
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
      <Typography variant="h5">店舗ページ</Typography>
      <Stack direction="row" justifyContent="center" pb={2}>
        <ToggleButtonGroup
          color="primary"
          size="small"
          value={toggleMenu}
          exclusive
          onChange={handleChange}
          aria-label="Platform"
        >
          {/* <ToggleButton value="top">トップページ</ToggleButton> */}
          <ToggleButton value="monthly">月別成果</ToggleButton>
          <ToggleButton value="yearly">年度別成果</ToggleButton>
        </ToggleButtonGroup>
      </Stack>
      {(() => {
        switch (toggleMenu) {
          case "monthly":
            return (
              <StoreMonthlyPage
                userId={userId}
                canEdit={canEdit}
                topicData={topicData}
                lastAppComposition={lastAppComposition}
                inProgressSalesResultData={inProgressSalesResultData}
              />
            );
          case "yearly":
            return (
              <YearlyPage
                userId={"1"}
                canEdit={canEdit}
                topicData={topicData}
                lastAppComposition={lastAppComposition}
              />
            );
          default:
            return <></>;
        }
      })()}
    </>
  );
};
export default StorePage;
