import { AuthUser } from "@aws-amplify/auth/cognito";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import { FC, useEffect, useMemo, useState } from "react";
import Button from "@mui/material/Button";
import { red } from "@mui/material/colors";
import { TopicBudgetAndAchievementType } from "../top/hooks/useTopicAchievementComposition";
import SimpleSummaryCard from "../components/charts/SimpleSummaryCard";
import SimpleSummaryCardWichHalfPieChart from "../components/charts/SimpleSummaryCardWithHalfPieChart";
import Box from "@mui/material/Box";
import YearlyResults from "./YearlyResults";

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
  const lastDay = useMemo(() => {
    const today = dayjs();
    // 次の6月30日
    let nextJune30 = dayjs().month(5).date(30);
    // 次の6月30日が今日より前なら、来年の6月30日を設定
    if (today.isAfter(nextJune30)) {
      nextJune30 = nextJune30.add(1, "year");
    }
    // 月の差を計算
    let lastMonths = nextJune30.diff(today, "month");
    let lastMonthDays = nextJune30
      .subtract(lastMonths, "month")
      .diff(today, "day");
    return {
      lastDay: nextJune30.diff(today, "day"),
      lastMonths,
      lastMonthDays,
    };
  }, []);

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
                mainValue: lastDay.lastDay,
                subValue: `(${lastDay.lastMonths}ヶ月と${lastDay.lastMonthDays}日)`,
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
        <YearlyResults userId={userId} canEdit={true} />
      </Stack>
    </>
  );
};
export default YearlyPage;
