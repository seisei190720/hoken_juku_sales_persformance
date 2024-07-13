import { FC, useCallback, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import {
  Application,
  CompanyMst,
  ConsultContentMst,
  IndividualSalesResult,
  NewVisitor,
  ProductMst,
  RouteMst,
  StatusMst,
} from "@/app/types";
import Stack from "@mui/material/Stack";
import SimpleSummaryCard from "../mypage/components/SimpleSummaryCard";
import Card from "@mui/material/Card";
import CircularProgress from "@mui/material/CircularProgress";
import CountAndPercentBarChart from "./components/CountAndPercentBarChart";
import { useStoreAchievementData } from "./hooks/useStoreAchievementData";

type Props = {
  applicationData: Application[] | undefined;
};

const StoreConstract: FC<Props> = ({ applicationData }) => {
  const storeAchievementData = useStoreAchievementData(undefined);

  return (
    <Stack gap={2} p={3}>
      <Stack direction="row" gap={2}>
        <SimpleSummaryCard
          values={{ mainValue: 18200, subValue: "予算：300000円" }}
          title={"予算到達まで残り"}
          mainUnit={"円"}
        />
        <SimpleSummaryCard
          values={{ mainValue: 230000, subValue: "達成率：85%" }}
          title={"当月実績"}
          mainUnit={"円"}
        />
        <SimpleSummaryCard
          values={{
            mainValue: 12,
            subValue: "",
          }}
          title={"申込残り"}
          mainUnit={"件"}
        />
      </Stack>
      <Stack direction="row" gap={2}>
        <CountAndPercentBarChart
          title={"実績(達成率)"}
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

export default StoreConstract;
