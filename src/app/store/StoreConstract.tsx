import { FC, useCallback, useState } from "react";
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
import CountAndPercentBarChart from "./components/CountAndPercentBarChart";
import { useStoreConstractData } from "./hooks/useStoreConstractData";
import ConstractSourceDataList from "./components/ConstractSourceDataList";

type Props = {
  salesResultData: IndividualSalesResult[] | undefined;
  applicationData: Application[] | undefined;
  members: Member[];
};

const StoreConstract: FC<Props> = ({
  salesResultData,
  applicationData,
  members,
}) => {
  const storeConstractData = useStoreConstractData(
    salesResultData,
    applicationData,
    members
  );

  return (
    <Stack gap={2} p={3}>
      <Stack direction="row" gap={2}>
        {/* <BudgetAchievementPieChart
          values={{
            予算: 120000,
            実績: 100000,
          }}
        /> */}
        <SimpleSummaryCard
          values={
            storeConstractData.storeConstractSum === undefined
              ? undefined
              : {
                  mainValue: storeConstractData.storeConstractSum,
                  subValue: "達成率：??%",
                }
          }
          title={"当月実績"}
          mainUnit={"円"}
        />
        <SimpleSummaryCard
          values={
            storeConstractData.storeConstractSum === undefined
              ? undefined
              : {
                  mainValue: storeConstractData.storeConstractSum,
                  subValue: "予算：???円",
                }
          }
          title={"予算到達まで残り"}
          mainUnit={"円"}
        />
        <SimpleSummaryCard
          values={
            storeConstractData.inProgressApplicationCount === undefined
              ? undefined
              : {
                  mainValue: storeConstractData.inProgressApplicationCount,
                  subValue: "",
                }
          }
          title={"申込残り"}
          mainUnit={"件"}
        />
      </Stack>
      <Stack direction="row" gap={2}>
        <CountAndPercentBarChart
          title={"実績(達成率)"}
          values={storeConstractData.constractSumAndAchievementRateData}
        />
        <ConstractSourceDataList
          title={"実績表"}
          values={storeConstractData.constractSouceData}
        />
      </Stack>
    </Stack>
  );
};

export default StoreConstract;
