import { FC, useCallback, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import {
  CompanyMst,
  ConsultContentMst,
  IndividualSalesResult,
  NewVisitor,
  ProductMst,
  RouteMst,
  StatusMst,
} from "@/app/types";
import Stack from "@mui/material/Stack";
import VisitorAndAppointmentBarChart from "./components/visitorAndAppointmentBarChart";
import { useStoreAchievementData } from "./hooks/useStoreAchievementData";
import CountAndPercentBarChart from "./components/CountAndPercentBarChart";
import Card from "@mui/material/Card";
import CircularProgress from "@mui/material/CircularProgress";
import SimpleSummaryCard from "../mypage/components/SimpleSummaryCard";

type Props = {
  salesResultData: IndividualSalesResult[] | undefined;
};

const StoreAchievement: FC<Props> = ({ salesResultData }) => {
  const storeAchievementData = useStoreAchievementData(salesResultData);
  return (
    <Stack gap={2} p={3}>
      <Stack direction="row" gap={2}>
        <VisitorAndAppointmentBarChart
          values={storeAchievementData.visitorAndAppointment}
        />
        <Card
          sx={{
            padding: 2,
            borderRadius: "12px",
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: 400,
          }}
        >
          {/* リストを表示する */}
          <CircularProgress />
        </Card>
      </Stack>
      <Stack direction="row" gap={2}>
        <Card
          sx={{
            padding: 2,
            borderRadius: "12px",
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: 400,
          }}
        >
          {/* リストを表示する */}
          <CircularProgress />
        </Card>
        <CountAndPercentBarChart
          title={"新規契約件数(率)"}
          values={storeAchievementData.countAndPercentData}
        />
      </Stack>
      <Stack direction="row" gap={2}>
        <CountAndPercentBarChart
          title={"ありがとう(率)"}
          values={storeAchievementData.countAndPercentData}
        />
        <Card
          sx={{
            padding: 2,
            borderRadius: "12px",
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: 400,
          }}
        >
          {/* リストを表示する */}
          <CircularProgress />
        </Card>
      </Stack>
    </Stack>
  );
};

export default StoreAchievement;
