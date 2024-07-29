import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { FC, useEffect, useMemo, useState } from "react";
import Box from "@mui/material/Box";
import SimpleSummaryCard from "../components/charts/SimpleSummaryCard";
import SimpleSummaryCardWichHalfPieChart from "../components/charts/SimpleSummaryCardWithHalfPieChart";
import ApplicationList from "../components/ApplicationList";
import {
  CompanyMst,
  IndividualSalesResult,
  ProductMst,
  StatusMst,
} from "@/app/types";
import { useContractBudgetApi } from "@/app/api/useContractBudgetApi";
import { resolveYear } from "@/app/api/useSalesResultApi";
import dayjs from "dayjs";
import { useApplicationApi } from "@/app/api/useApplicationApi";
import { useTopicAchievementComposition } from "./hooks/useTopicAchievementComposition";

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
  lastAppComposition,
  mstData,
}) => {
  // TODO
  // - [X] 1. ログインユーザーの今年分と今月分の予算を取得する。
  // - [X] 2. ログインユーザーの年間の契約情報を取得して、
  // - [ ] 3. 今年度の実績と、今月の実績を算出する。

  const crrMonth = useMemo(() => dayjs().format("YYYY-MM"), []);

  const { contractBudgetData, postContractBudgetData } = useContractBudgetApi({
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
            {/* <BudgetAchievementHalfPieChart /> */}
            <SimpleSummaryCardWichHalfPieChart
              values={topicData.yearBudgetAndAchievementData}
              title={`今年度の実績`}
              // title={`今年度の実績(${dayjs(crrMonth).format("YYYY年")})`}
              // mainUnit={"円"}
            />
            <SimpleSummaryCardWichHalfPieChart
              values={topicData.monthBudgetAndAchievementData}
              title={`今月の実績`}
              // title={`今月の実績(${dayjs(crrMonth).format("YYYY年MM月")})`}
              // mainUnit={"円"}
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
