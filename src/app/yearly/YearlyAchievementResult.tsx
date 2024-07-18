import { FC } from "react";
import {
  Application,
  IndividualSalesResult,
  Member,
  RouteMst,
} from "@/app/types";
import Stack from "@mui/material/Stack";
import YearlyVisitorAreaChart from "./components/YearlyVisitorAreaChart";
import { useYearlyAchievementComposition } from "./hooks/useYearlyAchievementComposition";
import YearlyComposedChart from "./components/YearlyComposedChart";
import { blue, pink } from "@mui/material/colors";
import SourceDataList from "../store/components/SourceDataList";
import VisitorAndAppointmentSourceDataList from "../store/components/VisitorAndAppointmentSourceDataList";

type Props = {
  salesResultData: IndividualSalesResult[] | undefined;
  members: Member[];
  routeMst: RouteMst[];
};

const YearlyAchievementResult: FC<Props> = ({ salesResultData, routeMst }) => {
  const yearlyAchievementComposition = useYearlyAchievementComposition(
    salesResultData,
    routeMst
  );

  return (
    <Stack gap={2} p={3}>
      <Stack direction="row" gap={2}>
        <YearlyVisitorAreaChart
          title={"来店者数推移"}
          values={yearlyAchievementComposition.visitorAndNextAppointmentData}
        />
        <VisitorAndAppointmentSourceDataList
          title={"来店者&次アポ数(率)"}
          values={yearlyAchievementComposition.visitorAndNextAppointmentData}
        />
      </Stack>
      <Stack direction="row" gap={2}>
        <SourceDataList
          title={"新規契約件数(率)表"}
          values={yearlyAchievementComposition.constractCountAndPercentData}
          columnHeaders={["名前", "契約数", "新規数", "割合"]}
        />
        <YearlyComposedChart
          title={"新規契約者数推移"}
          values={yearlyAchievementComposition.constractCountAndPercentData}
          barStroleColor={blue[400]}
          barFillColor={blue[200]}
        />
      </Stack>
      <Stack direction="row" gap={2}>
        <YearlyComposedChart
          title={"新規契約者数推移"}
          values={yearlyAchievementComposition.thankyouCountAndPercentData}
          barStroleColor={pink[400]}
          barFillColor={pink[200]}
        />
        <SourceDataList
          title={"ありがとう件数(率)表"}
          values={yearlyAchievementComposition.thankyouCountAndPercentData}
          columnHeaders={["名前", "件数", "申込数", "割合"]}
        />
      </Stack>
    </Stack>
  );
};

export default YearlyAchievementResult;
