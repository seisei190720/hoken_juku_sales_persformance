import { ProductMst, RouteMst } from "@/app/types";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import Stack from "@mui/material/Stack";
import { FC, useCallback, useState } from "react";
import ConsultContentPieChart from "./visitor/ConsultContentPieChart";
import ConsultContentSumarryCard from "./visitor/ConsultContentSumarryCard";
import VisitorBarChart from "./visitor/VisitorBarChart";
import SimpleSummaryCard from "./component/SimpleSummaryCard";
import ThreeCompartmentSummaryCard from "./component/ThreeCompartmentSummaryCard";
import ApplicatorBarChart from "./applicator/ApplicatorBarChart";
import { AuthUser } from "aws-amplify/auth";
import { useSummaryComposition } from "./hooks/useSummaryComposition";
import dayjs from "dayjs";
import { useSalesResultApi } from "@/app/api/useSalesResultApi";

type SummaryMode = "visitor" | "applicator";
type Props = {
  user: AuthUser;
  routeMst: RouteMst[];
  productMst: ProductMst[];
};
const Summary: FC<Props> = ({ user, routeMst, productMst }) => {
  const { salesResultData } = useSalesResultApi(user.userId, {
    status: null,
    firstVisitDate: dayjs().format("YYYY-MM"),
  });
  const data = useSummaryComposition(salesResultData, routeMst);
  const [summaryMode, setSummaryMode] = useState<SummaryMode>("visitor");
  const updateSummaryMode = useCallback(
    (event: React.MouseEvent<HTMLElement>, nextMode: string) => {
      setSummaryMode(nextMode as SummaryMode);
    },
    []
  );
  const sampleNum1: number = 14000;
  const sampleNum2: number = 16000;

  return (
    <>
      <Stack direction="column" gap={3} padding={2} borderColor={grey[300]}>
        <Stack direction="row" gap={3} alignItems="flex-end">
          <Typography variant="h4">7月のサマリ</Typography>
          <ToggleButtonGroup
            color="info"
            value={summaryMode}
            exclusive
            onChange={updateSummaryMode}
            aria-label="Platform"
          >
            <ToggleButton value="visitor">来店状況</ToggleButton>
            <ToggleButton value="applicator">申込状況</ToggleButton>
          </ToggleButtonGroup>
        </Stack>

        {(() => {
          switch (summaryMode) {
            case "visitor":
              return (
                <Stack direction="column" gap={2} ml="2vw">
                  <Stack direction="row" gap={2}>
                    <ThreeCompartmentSummaryCard
                      values={
                        data.visitorCount && {
                          mainValue: data.visitorCount.all,
                          sub1Value: `${data.visitorCount.new}人`,
                          sub2Value: `${data.visitorCount.exist}人`,
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
                        data.nextAppointment && {
                          mainValue: data.nextAppointment.pecent,
                          subValue: `( ${data.nextAppointment.count}件 )`,
                        }
                      }
                      title={"次アポ取得率"}
                      mainUnit={"%"}
                    />
                    <ConsultContentSumarryCard
                      consultContent={data.consultContent}
                    />
                  </Stack>
                  <Stack direction="row" gap={2}>
                    <VisitorBarChart values={data.routeBarChartData} />
                    <ConsultContentPieChart
                      values={data.consultContentPieChartData}
                    />
                  </Stack>
                </Stack>
              );
            case "applicator":
              return (
                <Stack direction="column" gap={2} ml="2vw">
                  <Stack direction="row" gap={2}>
                    <ThreeCompartmentSummaryCard
                      values={{
                        mainValue: 210000,
                        sub1Value: `${sampleNum1.toLocaleString()}円`,
                        sub2Value: `${sampleNum2.toLocaleString()}円`,
                      }}
                      title={"実績AC"}
                      mainUnit={"円"}
                      sub1ChipName={"生保"}
                      sub2ChipName={"損保"}
                      cardFlex={1.8}
                    />
                    <ThreeCompartmentSummaryCard
                      values={{
                        mainValue: 23,
                        sub1Value: "10件",
                        sub2Value: "12件",
                      }}
                      title={"契約件数"}
                      mainUnit={"件"}
                      sub1ChipName={"生保"}
                      sub2ChipName={"損保"}
                      cardFlex={1.5}
                    />
                    <SimpleSummaryCard
                      values={{ mainValue: 54, subValue: "( 9/18件 )" }}
                      title={"成約率"}
                      mainUnit={"%"}
                    />
                    <SimpleSummaryCard
                      values={{ mainValue: 67, subValue: "( 11/18件 )" }}
                      title={"ありがとう率"}
                      mainUnit={"%"}
                    />
                    <SimpleSummaryCard
                      values={{ mainValue: 3, subValue: "" }}
                      title={"申込残"}
                      mainUnit={"件"}
                    />
                  </Stack>
                  <Stack direction="row" gap={2}>
                    <ApplicatorBarChart productMst={productMst} />
                  </Stack>
                </Stack>
              );
          }
        })()}
      </Stack>
    </>
  );
};

export default Summary;
