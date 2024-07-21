import { FC } from "react";
import {
  Application,
  ContractBudget,
  IndividualSalesResult,
  Member,
} from "@/app/types";
import Stack from "@mui/material/Stack";
import SimpleSummaryCard from "../mypage/components/SimpleSummaryCard";
import CountAndPercentBarChart from "./components/CountAndPercentBarChart";
import { useStoreConstractData } from "./hooks/useStoreConstractData";
import ConstractSourceDataList from "./components/ConstractSourceDataList";
import BudgetCard from "../component/BudgetCard";
import { resolveYear } from "../api/useSalesResultApi";

type Props = {
  userId: string;
  targetMonth: string | null;
  inProgressSalesResultData: IndividualSalesResult[] | undefined;
  applicationData: Application[] | undefined;
  members: Member[];
  storeConstractBudgetData: ContractBudget[];
  postStoreConstractBudgetData: (newData: ContractBudget) => Promise<void>;
  memberConstractBudgetData: ContractBudget[];
};

const StoreConstract: FC<Props> = ({
  userId,
  targetMonth,
  inProgressSalesResultData,
  applicationData,
  members,
  storeConstractBudgetData,
  postStoreConstractBudgetData,
  memberConstractBudgetData,
}) => {
  const storeConstractData = useStoreConstractData(
    inProgressSalesResultData,
    applicationData,
    members,
    memberConstractBudgetData
  );

  return (
    <Stack gap={2} p={3}>
      <Stack direction="row" gap={2}>
        {/* <BudgetAchievementPieChart
          values={{
            予算: 120000,
            実績: 100000,
          }}
        /> */}
        <SimpleSummaryCard
          values={
            storeConstractData.storeConstractSum === undefined
              ? undefined
              : {
                  mainValue: storeConstractData.storeConstractSum,
                  subValue: "達成率：??%",
                }
          }
          title={"当月実績"}
          mainUnit={"円"}
        />
        <BudgetCard
          value={storeConstractData.storeConstractSum}
          title={"予算達成まで残り"}
          mainUnit={"円"}
          userId={"1"} //storeIdを入れたいので、
          targetMonth={targetMonth}
          targetYear={resolveYear(targetMonth)}
          contractBudgetData={
            storeConstractBudgetData === undefined
              ? undefined
              : storeConstractBudgetData.find(
                  (c: ContractBudget) => (c.userId = "1")
                ) || null
          }
          postContractBudgetData={postStoreConstractBudgetData}
          canEdit={true}
        />
        <SimpleSummaryCard
          values={
            storeConstractData.inProgressApplicationCount === undefined
              ? undefined
              : {
                  mainValue:
                    storeConstractData.inProgressApplicationCount.count,
                  subValue: `合計：${storeConstractData.inProgressApplicationCount.sum.toLocaleString()}円`,
                }
          }
          title={"申込残り"}
          mainUnit={"件"}
        />
      </Stack>
      <Stack direction="row" gap={2}>
        <CountAndPercentBarChart
          title={"実績(達成率)"}
          values={storeConstractData.constractSumAndAchievementRateData}
        />
        <ConstractSourceDataList
          title={"実績表"}
          values={storeConstractData.constractSouceData}
        />
      </Stack>
    </Stack>
  );
};

export default StoreConstract;
