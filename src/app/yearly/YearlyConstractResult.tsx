import { FC } from "react";
import { Application, IndividualSalesResult, ProductMst } from "@/app/types";
import Stack from "@mui/material/Stack";
import SimpleSummaryCard from "../mypage/components/SimpleSummaryCard";
import { useYearlyConstractComposition } from "./hooks/useYearlyConstractComposition";
import YearlyBudgetAndAchievementComposedChart from "./components/YearlyBudgetAndAchievementComposedChart";
import YearlyConstractStackedChart from "./components/YearlyConstractStackedChart";
import YearlyConstractSourceDataList from "./components/YearlyConstractSourceDataList";
import YearlyBudgetAndAchievementSourceDataList from "./components/YearlyBudgetAndAchievementSourceDataList";

type Props = {
  lastSalesResultData: IndividualSalesResult[] | undefined;
  applicationData: Application[] | undefined;
  productMst: ProductMst[];
};

const YearlyConstractResult: FC<Props> = ({
  lastSalesResultData,
  applicationData,
  productMst,
}) => {
  const yearlyConstractComposition = useYearlyConstractComposition(
    lastSalesResultData,
    applicationData,
    productMst
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
                  subValue: "達成率：??%",
                }
          }
          title={"今年度実績"}
          mainUnit={"円"}
        />
        <SimpleSummaryCard
          values={
            yearlyConstractComposition.allBudgetAndAchievementData === undefined
              ? undefined
              : {
                  mainValue:
                    yearlyConstractComposition.allBudgetAndAchievementData
                      .achivementSum,
                  subValue: "予算：???円",
                }
          }
          title={"予算到達まで残り"}
          mainUnit={"円"}
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
          columnHeaders={["月", "実績", "予算", "達成率"]}
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
