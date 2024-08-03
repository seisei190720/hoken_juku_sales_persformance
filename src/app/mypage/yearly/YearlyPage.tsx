import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import { FC, useEffect, useMemo, useState } from "react";
import { TopicBudgetAndAchievementType } from "../top/hooks/useTopicAchievementComposition";
import SimpleSummaryCard from "../components/charts/SimpleSummaryCard";
import SimpleSummaryCardWichHalfPieChart from "../components/charts/SimpleSummaryCardWithHalfPieChart";
import Box from "@mui/material/Box";
import YearlyResults from "./YearlyResults";
import { useCountDownYearDate } from "@/app/hooks/util";

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
const YearlyPage: FC<Props> = ({
  userId,
  canEdit,
  topicData,
  lastAppComposition,
}) => {
  const dateData = useCountDownYearDate();

  return (
    <>
      <Stack gap={3}>
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
            <Typography variant="h6">今年度のトピック</Typography>
          </Stack>
          <Stack direction="row" gap={3}>
            <SimpleSummaryCard
              values={{
                mainValue: dateData.lastDays,
                subValue: `経過率：${dateData.progressRate}%`,
                // subValue: `(${lastDay.lastMonths}ヶ月と${lastDay.lastMonthDays}日)`,
              }}
              title={"残り日数"}
              mainUnit={"日"}
            />
            <SimpleSummaryCardWichHalfPieChart
              values={topicData.yearBudgetAndAchievementData}
              title={`今年度の実績`}
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
          </Stack>
        </Box>
        <YearlyResults userId={userId} canEdit={canEdit} />
      </Stack>
    </>
  );
};
export default YearlyPage;
