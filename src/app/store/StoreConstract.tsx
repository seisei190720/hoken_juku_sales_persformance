import { FC } from "react";
import {
  Application,
  ContractBudget,
  IndividualSalesResult,
  Member,
  ProductMst,
} from "@/app/types";
import Stack from "@mui/material/Stack";
import { useStoreConstractData } from "./hooks/useStoreConstractData";
import YearlyBudgetAndAchievementComposedChart from "../component/charts/YearlyBudgetAndAchievementComposedChart";
import YearlyBudgetAndAchievementSourceDataList from "../component/lists/YearlyBudgetAndAchievementSourceDataList";

type Props = {
  userId: string;
  targetMonth: string | null;
  inProgressSalesResultData: IndividualSalesResult[] | undefined;
  applicationData: Application[] | undefined;
  productMst: ProductMst[];
  members: Member[];
  storeContractBudgetData: ContractBudget[];
  storePostContractBudgetData: (newData: ContractBudget) => Promise<void>;
  memberConstractBudget: ContractBudget[];
};

const StoreConstract: FC<Props> = ({
  userId,
  targetMonth,
  inProgressSalesResultData,
  applicationData,
  productMst,
  members,
  storeContractBudgetData,
  storePostContractBudgetData,
  memberConstractBudget,
}) => {
  const storeConstractData = useStoreConstractData(
    inProgressSalesResultData,
    applicationData,
    productMst,
    members,
    storeContractBudgetData,
    memberConstractBudget
  );

  return (
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
  );
};

export default StoreConstract;
