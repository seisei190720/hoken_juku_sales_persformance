import { FC } from "react";
import {
  Application,
  ContractBudget,
  IndividualSalesResult,
  Member,
} from "@/app/types";
import Stack from "@mui/material/Stack";
import SimpleSummaryCard from "../mypage/components/SimpleSummaryCard";
import { useStoreConstractData } from "./hooks/useStoreConstractData";
import BudgetCard from "../../component/BudgetCard";
import { resolveYear } from "../../api/useSalesResultApi";
import YearlyBudgetAndAchievementComposedChart from "../yearly/components/YearlyBudgetAndAchievementComposedChart";
import YearlyBudgetAndAchievementSourceDataList from "../yearly/components/YearlyBudgetAndAchievementSourceDataList";
import { useContractBudgetApi } from "../../api/useContractBudgetApi";

type Props = {
  userId: string;
  targetMonth: string | null;
  inProgressSalesResultData: IndividualSalesResult[] | undefined;
  applicationData: Application[] | undefined;
  members: Member[];
};

const StoreConstract: FC<Props> = ({
  userId,
  targetMonth,
  inProgressSalesResultData,
  applicationData,
  members,
}) => {
  const {
    contractBudgetData: storeContractBudgetData,
    postContractBudgetData: storePostContractBudgetData,
  } = useContractBudgetApi({
    userId: "1",
    year: resolveYear(targetMonth),
    month: targetMonth,
  });

  const { contractBudgetData: memberConstractBudget } = useContractBudgetApi({
    userId: null,
    year: resolveYear(targetMonth),
    month: targetMonth,
  });

  const storeConstractData = useStoreConstractData(
    inProgressSalesResultData,
    applicationData,
    members,
    storeContractBudgetData,
    memberConstractBudget
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
                  mainValue: storeConstractData.storeConstractSum.achivementSum,
                  subValue: `達成率：${storeConstractData.storeConstractSum.achivementPercent}%`,
                }
          }
          title={"当月実績"}
          mainUnit={"円"}
        />
        <BudgetCard
          value={storeConstractData.storeConstractSum?.achivementSum}
          title={"予算達成まで残り"}
          mainUnit={"円"}
          userId={"1"} //storeIdを入れたいので、
          targetMonth={targetMonth}
          targetYear={resolveYear(targetMonth)}
          contractBudgetData={
            storeContractBudgetData === undefined
              ? undefined
              : storeContractBudgetData.find(
                  (c: ContractBudget) => (c.userId = "1")
                ) || null
          }
          postContractBudgetData={storePostContractBudgetData}
          canEdit={true} //今は誰でもいじれるようにしているが、管理者しかいじれないようにする必要あり
        />
      </Stack>
      <Stack direction="row" gap={2}>
        <YearlyBudgetAndAchievementComposedChart
          title={"実績グラフ"}
          values={storeConstractData.constractSumAndAchievementRateData}
        />
        <YearlyBudgetAndAchievementSourceDataList
          title={"実績表"}
          values={storeConstractData.constractSumAndAchievementRateData}
          columnHeaders={["名前", "予算", "実績", "達成率"]}
        />
      </Stack>
    </Stack>
  );
};

export default StoreConstract;