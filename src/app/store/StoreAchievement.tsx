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
import VisitorAndAppointmentBarChart from "../component/charts/VisitorAndAppointmentBarChart";
import { useStoreAchievementData } from "./hooks/useStoreAchievementData";
import CountAndPercentBarChart from "../component/charts/CountAndPercentBarChart";
import VisitorAndAppointmentSourceDataList from "../component/lists/VisitorAndAppointmentSourceDataList";
import SourceDataList from "../component/lists/SourceDataList";

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
    <>
      <Stack direction="row" gap={2}>
        <VisitorAndAppointmentBarChart
          values={storeAchievementData.visitorAndAppointmentData}
        />
        <VisitorAndAppointmentSourceDataList
          title={"来店者数 & 次アポ取得数(率)"}
          values={storeAchievementData.visitorAndAppointmentData}
        />
      </Stack>
      <Stack direction="row" gap={2}>
        <SourceDataList
          title={"新規契約件数(率)"}
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
          title={"ありがとう件数(率)"}
          values={storeAchievementData.thankyouCountAndPercentData}
        />
        <SourceDataList
          title={"ありがとう件数(率)"}
          values={storeAchievementData.thankyouCountAndPercentData}
          columnHeaders={["名前", "件数", "申込数", "割合"]}
        />
      </Stack>
    </>
  );
};

export default StoreAchievement;
