import { IndividualSalesResult, ProductMst, RouteMst } from "@/app/types";
import { grey } from "@mui/material/colors";
import Stack from "@mui/material/Stack";
import { FC } from "react";
import ConsultContentPieChart from "../../../component/charts/ConsultContentPieChart";
import VisitorBarChart from "../../../component/charts/VisitorBarChart";
import ThreeCompartmentSummaryCard from "../../../component/cards/ThreeCompartmentSummaryCard";
import { useVisitorSummaryComposition } from "./hooks/useVisitorSummaryComposition";
import SimpleSummaryCard from "../../../component/cards/SimpleSummaryCard";

type Props = {
  userId: string;
  salesResultData: IndividualSalesResult[] | undefined;
  routeMst: RouteMst[];
  productMst: ProductMst[];
};
const Achievement: FC<Props> = ({
  userId,
  routeMst,
  productMst,
  salesResultData,
}) => {
  const visitorData = useVisitorSummaryComposition(salesResultData, routeMst);
  //   const lastApplicationData = useLastApplicationsComposition(userId);

  return (
    <>
      <Stack direction="column" gap={2} borderColor={grey[300]}>
        <Stack direction="column" gap={2}>
          <Stack direction="row" gap={2}>
            <ThreeCompartmentSummaryCard
              values={
                visitorData.visitorCount && {
                  mainValue: visitorData.visitorCount.all,
                  sub1Value: `${visitorData.visitorCount.new}人`,
                  sub2Value: `${visitorData.visitorCount.exist}人`,
                }
              }
              title={"来店者数"}
              mainUnit={"人"}
              sub1ChipName={"新規"}
              sub2ChipName={"既契約"}
              cardFlex={1}
            />
            <SimpleSummaryCard
              values={
                visitorData.nextAppointment && {
                  mainValue: visitorData.nextAppointment.pecent,
                  subValue: `( ${visitorData.nextAppointment.count}件 )`,
                }
              }
              title={"次アポ取得率"}
              mainUnit={"%"}
              height={215}
            />
            <SimpleSummaryCard
              values={
                visitorData.closedConstractData && {
                  mainValue: visitorData.closedConstractData.percent,
                  subValue: `( ${visitorData.closedConstractData.count}/${visitorData.closedConstractData.all}人 )`,
                }
              }
              title={"新規成約率"}
              mainUnit={"%"}
              height={215}
            />
            <SimpleSummaryCard
              values={
                visitorData.thankyouData && {
                  mainValue: visitorData.thankyouData.percent,
                  subValue: `( ${visitorData.thankyouData.count}/${visitorData.thankyouData.all}人 )`,
                }
              }
              title={"ありがとう率"}
              mainUnit={"%"}
              height={215}
            />
          </Stack>
          <Stack direction="row" gap={2}>
            <VisitorBarChart values={visitorData.routeBarChartData} />
            {/* <ConsultContentSumarryCard
                      consultContent={visitorData.consultContent}
                    /> */}
            <ConsultContentPieChart
              values={visitorData.consultContentPieChartData}
            />
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

export default Achievement;
