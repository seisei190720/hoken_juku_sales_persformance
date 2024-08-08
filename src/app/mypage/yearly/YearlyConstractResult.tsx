import { FC } from "react";
import { Application, ContractBudget, ProductMst } from "@/app/types";
import Stack from "@mui/material/Stack";
import { useYearlyConstractComposition } from "./hooks/useYearlyConstractComposition";
import YearlyBudgetAndAchievementComposedChart from "../../component/charts/YearlyBudgetAndAchievementComposedChart";
import YearlyConstractStackedChart from "../../component/charts/YearlyConstractStackedChart";
import YearlyConstractSourceDataList from "../../component/lists/YearlyConstractSourceDataList";
import YearlyBudgetAndAchievementSourceDataList from "../../component/lists/YearlyBudgetAndAchievementSourceDataList";
import BudgetCard from "../../component/cards/BudgetCard";
import ThreeCompartmentSummaryCard from "../../component/cards/ThreeCompartmentSummaryCard";

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
    contractBudgetData,
    userId
  );

  return (
    <Stack gap={2} p={3}>
      <Stack direction="row" gap={2}>
        <BudgetCard
          subValue={
            yearlyConstractComposition.sumAndPercentByProduct &&
            yearlyConstractComposition.sumAndPercentByProduct.achivementPercent
          }
          title={"予算"}
          mainUnit={"円"}
          userId={userId === "all" ? "1" : userId}
          targetMonth={null}
          targetYear={targetYear}
          contractBudgetData={yearlyConstractComposition.targetContractBudget}
          postContractBudgetData={postContractBudgetData}
          canEdit={canEdit}
        />
        <ThreeCompartmentSummaryCard
          values={
            yearlyConstractComposition.sumAndPercentByProduct && {
              mainValue:
                yearlyConstractComposition.sumAndPercentByProduct.achivementSum,
              sub1Value: `${yearlyConstractComposition.sumAndPercentByProduct.lifeAchivementSum.toLocaleString()}円`,
              sub2Value: `${yearlyConstractComposition.sumAndPercentByProduct.nonLifeAchivementSum.toLocaleString()}円`,
            }
          }
          title={"実績"}
          mainUnit={"円"}
          sub1ChipName={"生保"}
          sub2ChipName={"損保"}
          cardFlex={1.5}
        />
        <ThreeCompartmentSummaryCard
          values={
            yearlyConstractComposition.contractCountByProduct && {
              mainValue: yearlyConstractComposition.contractCountByProduct.all,
              sub1Value: `${yearlyConstractComposition.contractCountByProduct.life.toLocaleString()}件`,
              sub2Value: `${yearlyConstractComposition.contractCountByProduct.nonLife.toLocaleString()}件`,
            }
          }
          title={"契約件数"}
          mainUnit={"件"}
          sub1ChipName={"生保"}
          sub2ChipName={"損保"}
          cardFlex={1}
        />
      </Stack>
      <Stack direction="row" gap={2}>
        <YearlyBudgetAndAchievementComposedChart
          title={"予算と実績 [推移]"}
          values={yearlyConstractComposition.budgetAndAchievement}
        />
        <YearlyBudgetAndAchievementSourceDataList
          title={"予算と実績"}
          values={yearlyConstractComposition.budgetAndAchievement}
          columnHeaders={["月", "予算", "実績", "達成率"]}
        />
      </Stack>
      <Stack direction="row" gap={2}>
        <YearlyConstractSourceDataList
          title={"契約額"}
          values={yearlyConstractComposition.constractSum}
          columnHeaders={["月", "生保", "損保", "合計"]}
        />
        <YearlyConstractStackedChart
          title={"契約額 [推移]"}
          values={yearlyConstractComposition.constractSum}
        />
      </Stack>
      <Stack direction="row" gap={2}>
        <YearlyConstractStackedChart
          title={"契約件数 [推移]"}
          values={yearlyConstractComposition.constractCount}
        />
        <YearlyConstractSourceDataList
          title={"契約件数"}
          values={yearlyConstractComposition.constractCount}
          columnHeaders={["月", "生保", "損保", "合計"]}
        />
      </Stack>
    </Stack>
  );
};

export default YearlyConstractResult;
