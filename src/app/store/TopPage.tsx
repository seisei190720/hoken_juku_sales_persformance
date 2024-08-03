import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import { FC, useEffect, useMemo, useState } from "react";
import Box from "@mui/material/Box";
import { TopicBudgetAndAchievementType } from "../mypage/top/hooks/useTopicAchievementComposition";
import SimpleSummaryCard from "../mypage/components/charts/SimpleSummaryCard";
import SimpleSummaryCardWichHalfPieChart from "../mypage/components/charts/SimpleSummaryCardWithHalfPieChart";
import { Application, ContractBudget, IndividualSalesResult } from "../types";
import { useStoreTopComposition } from "./hooks/useStoreTopComposition";
import { useMockData } from "../mocks";
import BudgetAndAchievementExpectBarChart from "../component/BudgetAndAchievementExpectBarChart";
import BudgetAndAchievementExpectedSouceList from "../component/BudgetAndAchievementExpectedSouceList";

type Props = {
  userId: string;
  canEdit: boolean;
  topicData: {
    yearBudgetAndAchievementData: TopicBudgetAndAchievementType | undefined;
    monthBudgetAndAchievementData: TopicBudgetAndAchievementType | undefined;
  };
  lastAppComposition: {
    lastApplicationData:
      | {
          count: number;
          sum: number;
        }
      | undefined;
  };
  inProgressSalesResultData: IndividualSalesResult[] | undefined;
  memberContractBudgetData: ContractBudget[] | undefined;
  applicationData: Application[] | undefined;
};
const TopPage: FC<Props> = ({
  userId,
  canEdit,
  topicData,
  lastAppComposition,
  inProgressSalesResultData,
  memberContractBudgetData,
  applicationData,
}) => {
  const {
    members,
    // routeMst,
    // consultContentMst,
    // productMst,
    // companyMst,
    // statusMst,
  } = useMockData();
  const storeTopData = useStoreTopComposition(
    members,
    inProgressSalesResultData,
    topicData.monthBudgetAndAchievementData,
    // storeContractBudgetData,
    memberContractBudgetData,
    applicationData
  );
  const lastDay = useMemo(
    () => dayjs().endOf("month").diff(dayjs(), "day"),
    []
  );
  const progressRate = useMemo(() => {
    const today = dayjs();
    const daysInMonth = today.daysInMonth();
    const dayOfMonth = today.date();
    const progressRate = (dayOfMonth / daysInMonth) * 100;
    return progressRate.toFixed(1);
  }, []);
  return (
    <>
      <Stack gap={3}>
        <Box
          ml={1}
          mr={1}
          sx={{
            background: "#f5f5f5",
          }}
          borderRadius={"12px"}
          p={2}
        >
          <Stack mb={1}>
            <Typography variant="h6">今月のトピック</Typography>
          </Stack>
          <Stack direction="row" gap={3}>
            <SimpleSummaryCardWichHalfPieChart
              values={topicData.monthBudgetAndAchievementData}
              title={`今月の実績`}
            />
            <SimpleSummaryCardWichHalfPieChart
              values={topicData.yearBudgetAndAchievementData}
              title={`今年度の実績`}
            />
          </Stack>
        </Box>

        <Box
          ml={1}
          mr={1}
          sx={{
            // minHeight: "calc(100vh - 200px)",
            background: "#f5f5f5",
          }}
          borderRadius={"12px"}
          p={2}
        >
          <Stack mb={1}>
            <Typography variant="h6">今月の見込実績</Typography>
          </Stack>
          <Stack gap={3}>
            <Stack direction="row" gap={3}>
              <SimpleSummaryCard
                values={{
                  mainValue: lastDay,
                  subValue: `経過率：${progressRate}%`,
                }}
                title={"残り日数"}
                mainUnit={"日"}
              />
              <SimpleSummaryCard
                values={
                  lastAppComposition.lastApplicationData && {
                    mainValue: lastAppComposition.lastApplicationData.sum,
                    subValue: `${lastAppComposition.lastApplicationData.count}件`,
                  }
                }
                title={"未成立の申込残り"}
                mainUnit={"円"}
              />
              <SimpleSummaryCardWichHalfPieChart
                values={storeTopData.storeBudgetAndAchievementExpect}
                title={`見込実績`}
              />
            </Stack>
            <Stack direction="row" gap={2}>
              <BudgetAndAchievementExpectBarChart
                title={"実績グラフ"}
                values={storeTopData.budgetAndAchievementExpectByMember}
              />
              <BudgetAndAchievementExpectedSouceList
                title={"実績見込表"}
                values={storeTopData.budgetAndAchievementExpectByMember}
                columnHeaders={["名前", "予算", "実績", "見込額", "不足額"]}
              />
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </>
  );
};
export default TopPage;
