import { ProductMst, RouteMst } from "@/app/types";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import Stack from "@mui/material/Stack";
import { FC, useCallback, useEffect, useState } from "react";
import ConsultContentPieChart from "./visitor/ConsultContentPieChart";
import ConsultContentSumarryCard from "./visitor/ConsultContentSumarryCard";
import VisitorBarChart from "./visitor/VisitorBarChart";
import SimpleSummaryCard from "./component/SimpleSummaryCard";
import ThreeCompartmentSummaryCard from "./component/ThreeCompartmentSummaryCard";
import ApplicatorBarChart from "./applicator/ApplicatorBarChart";
import { AuthUser } from "aws-amplify/auth";
import { useVisitorSummaryComposition } from "./hooks/useVisitorSummaryComposition";
import dayjs from "dayjs";
import { useSalesResultApi } from "@/app/api/useSalesResultApi";
import Button from "@mui/material/Button";
import { useApplicatorSummaryComposition } from "./hooks/useApplicatorSummaryComposition";

type SummaryMode = "visitor" | "applicator";
type Props = {
  user: AuthUser;
  routeMst: RouteMst[];
  productMst: ProductMst[];
};
const Summary: FC<Props> = ({ user, routeMst, productMst }) => {
  const [targetMonth, setTargetMonth] = useState<string | null>(null);

  const forwardToNextMonth = () => {
    setTargetMonth((v) => dayjs(v).add(1, "month").format("YYYY-MM"));
  };
  const backToLastMonth = () => {
    setTargetMonth((v) => dayjs(v).subtract(1, "month").format("YYYY-MM"));
  };

  useEffect(() => {
    setTargetMonth(dayjs().format("YYYY-MM"));
  }, [setTargetMonth]);

  const { salesResultData } = useSalesResultApi(user.userId, {
    status: null,
    firstVisitDate: targetMonth,
  });
  const visitorData = useVisitorSummaryComposition(salesResultData, routeMst);
  const applicatorData = useApplicatorSummaryComposition(
    salesResultData,
    productMst
  );
  const [summaryMode, setSummaryMode] = useState<SummaryMode>("visitor");
  const updateSummaryMode = useCallback(
    (event: React.MouseEvent<HTMLElement>, nextMode: string) => {
      setSummaryMode(nextMode as SummaryMode);
    },
    []
  );

  return (
    <>
      <Stack direction="column" gap={2} p={2} pt={3} borderColor={grey[300]}>
        <Stack direction="row" gap={3} ml={2} alignItems="flex-end">
          <Typography variant="h5">レポート</Typography>
          <Stack direction="row" ml={2} alignItems="center">
            <Button onClick={backToLastMonth}>＜</Button>
            <Typography>{targetMonth}</Typography>
            <Button onClick={forwardToNextMonth}>＞</Button>
          </Stack>
          <ToggleButtonGroup
            size="small"
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
                <Stack direction="column" gap={2} ml={2}>
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
                    />
                    <ConsultContentSumarryCard
                      consultContent={visitorData.consultContent}
                    />
                  </Stack>
                  <Stack direction="row" gap={2}>
                    <VisitorBarChart values={visitorData.routeBarChartData} />
                    <ConsultContentPieChart
                      values={visitorData.consultContentPieChartData}
                    />
                  </Stack>
                </Stack>
              );
            case "applicator":
              return (
                <Stack direction="column" gap={2} ml="2vw">
                  <Stack direction="row" gap={2}>
                    <ThreeCompartmentSummaryCard
                      values={
                        applicatorData.fistYearFeeData && {
                          mainValue: applicatorData.fistYearFeeData.all,
                          sub1Value: `${applicatorData.fistYearFeeData.life.toLocaleString()}円`,
                          sub2Value: `${applicatorData.fistYearFeeData.nonLife.toLocaleString()}円`,
                        }
                      }
                      title={"実績AC"}
                      mainUnit={"円"}
                      sub1ChipName={"生保"}
                      sub2ChipName={"損保"}
                      cardFlex={1.8}
                    />
                    <ThreeCompartmentSummaryCard
                      values={
                        applicatorData.constractData && {
                          mainValue: applicatorData.constractData.all,
                          sub1Value: `${applicatorData.constractData.life}件`,
                          sub2Value: `${applicatorData.constractData.nonLife}件`,
                        }
                      }
                      title={"契約件数"}
                      mainUnit={"件"}
                      sub1ChipName={"生保"}
                      sub2ChipName={"損保"}
                      cardFlex={1.5}
                    />
                    <SimpleSummaryCard
                      values={
                        visitorData.closedConstractData && {
                          mainValue: visitorData.closedConstractData.percent,
                          subValue: `( ${visitorData.closedConstractData.count}/${visitorData.closedConstractData.all}件 )`,
                        }
                      }
                      title={"新規成約率"}
                      mainUnit={"%"}
                    />
                    <SimpleSummaryCard
                      values={
                        applicatorData.thankyouData && {
                          mainValue: applicatorData.thankyouData.percent,
                          subValue: `( ${applicatorData.thankyouData.count}/${applicatorData.thankyouData.all}件 )`,
                        }
                      }
                      title={"ありがとう率"}
                      mainUnit={"%"}
                    />
                    <SimpleSummaryCard
                      values={
                        applicatorData.lastApplicationCount !== undefined
                          ? {
                              mainValue: applicatorData.lastApplicationCount,
                              subValue: "",
                            }
                          : undefined
                      }
                      title={"申込残"}
                      mainUnit={"件"}
                    />
                  </Stack>
                  <Stack direction="row" gap={2}>
                    <ApplicatorBarChart
                      values={applicatorData.productBarChartData}
                    />
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
