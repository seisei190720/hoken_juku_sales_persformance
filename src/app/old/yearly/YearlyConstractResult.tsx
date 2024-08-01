import { FC } from "react";
import {
  Application,
  ContractBudget,
  IndividualSalesResult,
  Member,
  ProductMst,
} from "@/app/types";
import Stack from "@mui/material/Stack";
import SimpleSummaryCard from "../mypage/components/SimpleSummaryCard";
import { useYearlyConstractComposition } from "./hooks/useYearlyConstractComposition";
import YearlyBudgetAndAchievementComposedChart from "./components/YearlyBudgetAndAchievementComposedChart";
import YearlyConstractStackedChart from "./components/YearlyConstractStackedChart";
import YearlyConstractSourceDataList from "./components/YearlyConstractSourceDataList";
import YearlyBudgetAndAchievementSourceDataList from "./components/YearlyBudgetAndAchievementSourceDataList";
import BudgetCard from "../../component/BudgetCard";

type Props = {
  userId: string; // userId or "1"(storeId)の可能性がある
  canEdit: boolean;
  targetYear: string | null;
  applicationData: Application[] | undefined;
  productMst: ProductMst[];
  contractBudgetData: ContractBudget[];
  postContractBudgetData: (newData: ContractBudget) => Promise<void>;
};

const YearlyConstractResult: FC<Props> = ({
  userId,
  canEdit,
  targetYear,
  applicationData,
  productMst,
  contractBudgetData,
  postContractBudgetData,
}) => {
  const yearlyConstractComposition = useYearlyConstractComposition(
    applicationData,
    productMst,
    contractBudgetData
  );

  return (
    <Stack gap={2} p={3}>
      <Stack direction="row" gap={2}>
        <SimpleSummaryCard
          values={
            yearlyConstractComposition.allBudgetAndAchievementData === undefined
              ? undefined
              : {
                  mainValue:
                    yearlyConstractComposition.allBudgetAndAchievementData
                      .achivementSum,
                  subValue: `達成率：${yearlyConstractComposition.allBudgetAndAchievementData.achivementPercent}%`,
                }
          }
          title={"今年度実績"}
          mainUnit={"円"}
        />
        <BudgetCard
          value={
            yearlyConstractComposition.allBudgetAndAchievementData
              ?.achivementSum
          }
          title={"予算達成まで残り"}
          mainUnit={"円"}
          userId={userId === "all" ? "1" : userId}
          targetMonth={null}
          targetYear={targetYear}
          contractBudgetData={
            contractBudgetData === undefined
              ? undefined
              : contractBudgetData.find(
                  (c: ContractBudget) => (c.userId = userId) && c.month === null
                ) || null
          }
          postContractBudgetData={postContractBudgetData}
          canEdit={canEdit}
        />
      </Stack>
      <Stack direction="row" gap={2}>
        <YearlyBudgetAndAchievementComposedChart
          title={"予算と実績"}
          values={yearlyConstractComposition.budgetAndAchievementData}
        />
        <YearlyBudgetAndAchievementSourceDataList
          title={"予算と実績"}
          values={yearlyConstractComposition.budgetAndAchievementData}
          columnHeaders={["月", "予算", "実績", "達成率"]}
        />
      </Stack>
      <Stack direction="row" gap={2}>
        <YearlyConstractSourceDataList
          title={"契約額"}
          values={yearlyConstractComposition.constractSumData}
          columnHeaders={["月", "生保", "損保", "合計"]}
        />
        <YearlyConstractStackedChart
          title={"契約額"}
          values={yearlyConstractComposition.constractSumData}
        />
      </Stack>
      <Stack direction="row" gap={2}>
        <YearlyConstractStackedChart
          title={"契約件数"}
          values={yearlyConstractComposition.constractCountData}
        />
        <YearlyConstractSourceDataList
          title={"契約件数表"}
          values={yearlyConstractComposition.constractCountData}
          columnHeaders={["月", "生保", "損保", "合計"]}
        />
      </Stack>
    </Stack>
  );
};

export default YearlyConstractResult;
