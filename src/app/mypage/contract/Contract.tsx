import { useApplicationApi } from "@/app/api/useApplicationApi";
import { resolveYear } from "@/app/api/useSalesResultApi";
import { ProductMst, RouteMst } from "@/app/types";
import { grey } from "@mui/material/colors";
import Stack from "@mui/material/Stack";
import { FC } from "react";
import SimpleSummaryCard from "../components/SimpleSummaryCard";
import ThreeCompartmentSummaryCard from "../components/ThreeCompartmentSummaryCard";
import ApplicatorBarChart from "./components/ApplicatorBarChart";
import { useApplicatorSummaryComposition } from "./hooks/useApplicatorSummaryComposition";
import { useLastApplicationsComposition } from "./hooks/useLastApplicationsComposition";

type Props = {
  userId: string;
  targetMonth: string | null;
  productMst: ProductMst[];
};
const Constract: FC<Props> = ({ userId, targetMonth, productMst }) => {
  const { applicationData } = useApplicationApi({
    userId: userId,
    year: resolveYear(targetMonth),
    establishDate: targetMonth,
  });
  const applicatorData = useApplicatorSummaryComposition(
    applicationData,
    productMst
  );
  const lastApplicationData = useLastApplicationsComposition(userId);
  return (
    <>
      <Stack direction="column" gap={2} p={2} pt={3} borderColor={grey[300]}>
        <Stack direction="column" gap={2} ml="2vw">
          <Stack direction="row" gap={2}>
            <ThreeCompartmentSummaryCard
              values={
                applicatorData.fistYearFeeData && {
                  mainValue: applicatorData.fistYearFeeData.all,
                  sub1Value: `${applicatorData.fistYearFeeData.life.toLocaleString()}円`,
                  sub2Value: `${applicatorData.fistYearFeeData.nonLife.toLocaleString()}円`,
                }
              }
              title={"実績AC"}
              mainUnit={"円"}
              sub1ChipName={"生保"}
              sub2ChipName={"損保"}
              cardFlex={2}
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
              cardFlex={1.5}
            />
            <SimpleSummaryCard
              values={
                lastApplicationData !== undefined
                  ? {
                      mainValue: lastApplicationData.count,
                      subValue: "",
                    }
                  : undefined
              }
              title={"申込残"}
              mainUnit={"件"}
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
