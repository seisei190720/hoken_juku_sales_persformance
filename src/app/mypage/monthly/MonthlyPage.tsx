import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { FC, useEffect, useMemo, useState } from "react";
import Box from "@mui/material/Box";
import SimpleSummaryCardWichHalfPieChart from "../../component/charts/SimpleSummaryCardWithHalfPieChart";
import SimpleSummaryCard from "../components/charts/SimpleSummaryCard";
import MonthlyPageContents from "@/app/mypage/monthly/MonthlyPageContents";
import { TopicBudgetAndAchievementType } from "../top/hooks/useTopicAchievementComposition";
import { useCountDownMonthDate } from "@/app/hooks/util";

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
};
const MonthlyPage: FC<Props> = ({
  userId,
  canEdit,
  topicData,
  lastAppComposition,
}) => {
  const dateData = useCountDownMonthDate();
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
            <SimpleSummaryCard
              values={{
                mainValue: dateData.lastDays,
                subValue: `経過率：${dateData.progressRate}%`,
              }}
              title={"残り日数"}
              mainUnit={"日"}
              height={180}
            />
            <SimpleSummaryCardWichHalfPieChart
              values={topicData.monthBudgetAndAchievementData}
              title={`今月の実績`}
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
              height={180}
            />
          </Stack>
        </Box>
        <MonthlyPageContents userId={userId} canEdit={canEdit} />
      </Stack>
    </>
  );
};
export default MonthlyPage;
