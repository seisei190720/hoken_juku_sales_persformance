import { FC } from "react";
import {
  CompanyMst,
  ConsultContentMst,
  IndividualSalesResult,
  Member,
  ProductMst,
  RouteMst,
  StatusMst,
} from "@/app/types";
import Stack from "@mui/material/Stack";
import VisitorAndAppointmentBarChart from "./components/VisitorAndAppointmentBarChart";
import { useStoreAchievementData } from "./hooks/useStoreAchievementData";
import CountAndPercentBarChart from "./components/CountAndPercentBarChart";
import VisitorAndAppointmentSourceDataList from "./components/VisitorAndAppointmentSourceDataList";
import SourceDataList from "./components/SourceDataList";

type Props = {
  salesResultData: IndividualSalesResult[] | undefined;
  members: Member[];
  routeMst: RouteMst[];
  consultContentMst: ConsultContentMst[];
  productMst: ProductMst[];
  companyMst: CompanyMst[];
  statusMst: StatusMst[];
};

const StoreAchievement: FC<Props> = ({
  salesResultData,
  members,
  routeMst,
  consultContentMst,
  productMst,
  companyMst,
  statusMst,
}) => {
  const storeAchievementData = useStoreAchievementData(
    salesResultData,
    members,
    routeMst,
    consultContentMst,
    productMst,
    companyMst,
    statusMst
  );
  return (
    <Stack gap={2} p={3}>
      <Stack direction="row" gap={2}>
        <VisitorAndAppointmentBarChart
          values={storeAchievementData.visitorAndAppointmentData}
        />
        <VisitorAndAppointmentSourceDataList
          title={"来店者&次アポ表"}
          values={storeAchievementData.visitorAndAppointmentData}
        />
      </Stack>
      <Stack direction="row" gap={2}>
        <SourceDataList
          title={"新規契約件数(率)表"}
          values={storeAchievementData.constractCountAndPercentData}
          columnHeaders={["名前", "契約数", "新規数", "割合"]}
        />
        <CountAndPercentBarChart
          title={"新規契約件数(率)"}
          values={storeAchievementData.constractCountAndPercentData}
        />
      </Stack>
      <Stack direction="row" gap={2}>
        <CountAndPercentBarChart
          title={"ありがとう(率)"}
          values={storeAchievementData.thankyouCountAndPercentData}
        />
        <SourceDataList
          title={"ありがとう件数(率)表"}
          values={storeAchievementData.thankyouCountAndPercentData}
          columnHeaders={["名前", "件数", "申込数", "割合"]}
        />
      </Stack>
    </Stack>
  );
};

export default StoreAchievement;
