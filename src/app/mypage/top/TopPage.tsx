import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { FC, useEffect, useMemo, useState } from "react";
import Box from "@mui/material/Box";
import SimpleSummaryCard from "../components/charts/SimpleSummaryCard";
import SimpleSummaryCardWichHalfPieChart from "../../component/charts/SimpleSummaryCardWithHalfPieChart";
import ApplicationList from "../components/ApplicationList";
import {
  CompanyMst,
  IndividualSalesResult,
  ProductMst,
  StatusMst,
} from "@/app/types";
import { TopicBudgetAndAchievementType } from "./hooks/useTopicAchievementComposition";

type Props = {
  userId: string;
  canEdit: boolean;
  mstData: {
    productMst: ProductMst[];
    companyMst: CompanyMst[];
    statusMst: StatusMst[];
  };
  inProgressApp: IndividualSalesResult[];
  updateInProgressApp: (newData: IndividualSalesResult) => Promise<void>;
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
const TopPage: FC<Props> = ({
  userId,
  canEdit,
  inProgressApp,
  updateInProgressApp,
  mstData,
  topicData,
  lastAppComposition,
}) => {
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
            <Typography variant="h6">トピック</Typography>
          </Stack>
          <Stack direction="row" gap={2}>
            <SimpleSummaryCardWichHalfPieChart
              values={topicData.monthBudgetAndAchievementData}
              title={`今月の実績`}
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
        <Box
          ml={1}
          mr={1}
          sx={{
            minHeight: "calc(100vh - 470px)",
            background: "#f5f5f5",
          }}
          borderRadius={"12px"}
          p={2}
          gap={2}
        >
          <Stack gap={1}>
            <Typography variant="h6">未成立の申込一覧</Typography>
            <Stack gap={2} ml={2} mr={2}>
              <ApplicationList
                salesResultData={inProgressApp}
                updateApplicationsData={updateInProgressApp}
                productMst={mstData.productMst}
                companyMst={mstData.companyMst}
                statusMst={mstData.statusMst}
                canEdit={canEdit}
              />
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </>
  );
};
export default TopPage;
