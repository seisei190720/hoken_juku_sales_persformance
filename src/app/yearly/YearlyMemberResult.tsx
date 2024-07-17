import { FC, useCallback, useEffect, useState } from "react";
import {
  Application,
  CompanyMst,
  ConsultContentMst,
  IndividualSalesResult,
  Member,
  NewVisitor,
  ProductMst,
  RouteMst,
  StatusMst,
} from "@/app/types";
import Stack from "@mui/material/Stack";
import SimpleSummaryCard from "../mypage/components/SimpleSummaryCard";
import YearlyVisitorAreaChart from "./components/YearlyVisitorAreaChart";
import { useYearlyMemberComposition } from "./hooks/useYearlyMemberComposition";
import YearlyComposedChart from "./components/YearlyComposedChart";
import { blue, pink } from "@mui/material/colors";
import SourceDataList from "../store/components/SourceDataList";

type Props = {
  salesResultData: IndividualSalesResult[] | undefined;
  applicationData: Application[] | undefined;
  members: Member[];
  routeMst: RouteMst[];
};

const YearlyMemberResult: FC<Props> = ({
  salesResultData,
  applicationData,
  routeMst,
}) => {
  const yearlyMemberComposition = useYearlyMemberComposition(
    salesResultData,
    // applicationData,
    routeMst
  );

  return (
    <Stack gap={2} p={3}>
      <Stack direction="row" gap={2}>
        <YearlyVisitorAreaChart
          title={"来店者数推移"}
          values={yearlyMemberComposition.visitorAndNextAppointmentData}
        />
      </Stack>
      <Stack direction="row" gap={2}>
        <SourceDataList
          title={"新規契約件数(率)表"}
          values={yearlyMemberComposition.constractCountAndPercentData}
          columnHeaders={["名前", "契約数", "新規数", "割合"]}
        />
        <YearlyComposedChart
          title={"新規契約者数推移"}
          values={yearlyMemberComposition.constractCountAndPercentData}
          barStroleColor={blue[400]}
          barFillColor={blue[200]}
        />
      </Stack>
      <Stack direction="row" gap={2}>
        <YearlyComposedChart
          title={"新規契約者数推移"}
          values={yearlyMemberComposition.thankyouCountAndPercentData}
          barStroleColor={pink[400]}
          barFillColor={pink[200]}
        />
        <SourceDataList
          title={"ありがとう件数(率)表"}
          values={yearlyMemberComposition.thankyouCountAndPercentData}
          columnHeaders={["名前", "件数", "申込数", "割合"]}
        />
      </Stack>
    </Stack>
  );
};

export default YearlyMemberResult;
