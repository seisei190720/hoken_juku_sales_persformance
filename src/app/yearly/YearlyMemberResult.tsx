import { FC, useCallback, useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
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
import VisitorAreaChart from "./components/VisitorAreaChart";
import { useYearlyMemberComposition } from "./hooks/useYearlyMemberComposition";

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
        <VisitorAreaChart
          title={"来店者数推移"}
          values={yearlyMemberComposition.visitorSourceData}
        />
      </Stack>
      <Stack direction="row" gap={2}></Stack>
    </Stack>
  );
};

export default YearlyMemberResult;
