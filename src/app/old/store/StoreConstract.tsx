import { FC } from "react";
import {
  Application,
  IndividualSalesResult,
  Member,
  ProductMst,
} from "@/app/types";
import Stack from "@mui/material/Stack";
import { useStoreConstractData } from "./hooks/useStoreConstractData";
import BudgetCard from "../../component/BudgetCard";
import { resolveYear } from "../../api/useSalesResultApi";
import YearlyBudgetAndAchievementComposedChart from "../yearly/components/YearlyBudgetAndAchievementComposedChart";
import YearlyBudgetAndAchievementSourceDataList from "../yearly/components/YearlyBudgetAndAchievementSourceDataList";
import { useContractBudgetApi } from "../../api/useContractBudgetApi";
import ThreeCompartmentSummaryCard from "../mypage/components/ThreeCompartmentSummaryCard";

type Props = {
  userId: string;
  targetMonth: string | null;
  inProgressSalesResultData: IndividualSalesResult[] | undefined;
  applicationData: Application[] | undefined;
  productMst: ProductMst[];
  members: Member[];
};

const StoreConstract: FC<Props> = ({
  userId,
  targetMonth,
  inProgressSalesResultData,
  applicationData,
  productMst,
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
    productMst,
    members,
    storeContractBudgetData,
    memberConstractBudget
  );

  return (
    <Stack gap={2} p={3}>
      <Stack direction="row" gap={2}>
        <BudgetCard
          subValue={
            storeConstractData.constractSumByProduct &&
            storeConstractData.constractSumByProduct.achivementPercent
          }
          title={"予算"}
          mainUnit={"円"}
          userId={"1"} //storeIdを入れたいので、
          targetMonth={targetMonth}
          targetYear={resolveYear(targetMonth)}
          contractBudgetData={storeConstractData.targetStoreContractBudget}
          postContractBudgetData={storePostContractBudgetData}
          canEdit={true} //今は誰でもいじれるようにしているが、管理者しかいじれないようにする必要あり
        />
        <ThreeCompartmentSummaryCard
          values={
            storeConstractData.constractSumByProduct && {
              mainValue: storeConstractData.constractSumByProduct.achivementSum,
              sub1Value: `${storeConstractData.constractSumByProduct.life.toLocaleString()}円`,
              sub2Value: `${storeConstractData.constractSumByProduct.nonLife.toLocaleString()}円`,
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
            storeConstractData.constractCountByProduct && {
              mainValue: storeConstractData.constractCountByProduct.all,
              sub1Value: `${storeConstractData.constractCountByProduct.life.toLocaleString()}件`,
              sub2Value: `${storeConstractData.constractCountByProduct.nonLife.toLocaleString()}件`,
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
