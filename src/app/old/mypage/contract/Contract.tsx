import { resolveYear } from "@/app/api/useSalesResultApi";
import BudgetCard from "@/app/component/BudgetCard";
import { Application, ContractBudget, ProductMst } from "@/app/types";
import { grey } from "@mui/material/colors";
import Stack from "@mui/material/Stack";
import { FC } from "react";
import ThreeCompartmentSummaryCard from "../components/ThreeCompartmentSummaryCard";
import ApplicatorBarChart from "./components/ApplicatorBarChart";
import { useApplicatorSummaryComposition } from "./hooks/useApplicatorSummaryComposition";

type Props = {
  userId: string;
  targetMonth: string | null;
  productMst: ProductMst[];
  canEdit: boolean;
  contractBudgetData: ContractBudget[];
  postContractBudgetData: (newData: ContractBudget) => Promise<void>;
  applicationData: Application[] | undefined;
};
const Constract: FC<Props> = ({
  userId,
  targetMonth,
  productMst,
  canEdit,
  contractBudgetData,
  postContractBudgetData,
  applicationData,
}) => {
  const applicatorData = useApplicatorSummaryComposition(
    applicationData,
    productMst,
    contractBudgetData,
    userId
  );

  return (
    <>
      <Stack direction="column" gap={2} borderColor={grey[300]}>
        <Stack direction="column" gap={2}>
          <Stack direction="row" gap={2}>
            <BudgetCard
              subValue={
                applicatorData && applicatorData.contractAchievementRate
              }
              title={"予算"}
              mainUnit={"円"}
              userId={userId}
              targetMonth={targetMonth}
              targetYear={resolveYear(targetMonth)}
              contractBudgetData={applicatorData.targetContract}
              postContractBudgetData={postContractBudgetData}
              canEdit={canEdit}
            />
            <ThreeCompartmentSummaryCard
              values={
                applicatorData.fistYearFeeData && {
                  mainValue: applicatorData.fistYearFeeData.all,
                  sub1Value: `${applicatorData.fistYearFeeData.life.toLocaleString()}円`,
                  sub2Value: `${applicatorData.fistYearFeeData.nonLife.toLocaleString()}円`,
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
                applicatorData.constractData && {
                  mainValue: applicatorData.constractData.all,
                  sub1Value: `${applicatorData.constractData.life}件`,
                  sub2Value: `${applicatorData.constractData.nonLife}件`,
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
            <ApplicatorBarChart values={applicatorData.productBarChartData} />
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

export default Constract;
