import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import { FC, useEffect, useMemo, useState } from "react";
import Box from "@mui/material/Box";
import { TopicBudgetAndAchievementType } from "../mypage/top/hooks/useTopicAchievementComposition";
import SimpleSummaryCard from "../mypage/components/charts/SimpleSummaryCard";
import SimpleSummaryCardWichHalfPieChart from "../mypage/components/charts/SimpleSummaryCardWithHalfPieChart";
import { IndividualSalesResult } from "../types";
import StoreMonthlyContents from "./StoreMonthlyContents";

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
};
const StoreMonthlyPage: FC<Props> = ({
  userId,
  canEdit,
  topicData,
  lastAppComposition,
  inProgressSalesResultData,
}) => {
  const lastDay = useMemo(
    () => dayjs().endOf("month").diff(dayjs(), "day"),
    []
  );
  const progressRate = useMemo(() => {
    const today = dayjs();
    // 今月の日数を取得
    const daysInMonth = today.daysInMonth();
    // 今日が今月の何日目かを取得
    const dayOfMonth = today.date();
    // 経過率を計算
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
            // minHeight: "calc(100vh - 200px)",
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
                mainValue: lastDay,
                subValue: `経過率：${progressRate}%`,
              }}
              title={"残り日数"}
              mainUnit={"日"}
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
            />
          </Stack>
        </Box>
        <StoreMonthlyContents
          userId={userId}
          canEdit={true}
          inProgressSalesResultData={inProgressSalesResultData}
        />
      </Stack>
    </>
  );
};
export default StoreMonthlyPage;
