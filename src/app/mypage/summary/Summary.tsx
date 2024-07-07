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

type SummaryMode = "visitor" | "applicator";
type Props = {
  routeMst: RouteMst[];
  productMst: ProductMst[];
};
const Summary: FC<Props> = ({ routeMst, productMst }) => {
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
                      title={"来店者数"}
                      mainValue={32}
                      mainUnit={"人"}
                      sub1Value={"20人"}
                      sub1ChipName={"新規"}
                      sub2Value={"12人"}
                      sub2ChipName={"既契約"}
                      cardFlex={1}
                    />
                    <SimpleSummaryCard
                      title={"次アポ取得率"}
                      mainValue={67}
                      mainUnit={"%"}
                      subValue={"( 21件 )"}
                    />
                    <ConsultContentSumarryCard />
                  </Stack>
                  <Stack direction="row" gap={2}>
                    <VisitorBarChart routeMst={routeMst} />
                    <ConsultContentPieChart />
                  </Stack>
                </Stack>
              );
            case "applicator":
              return (
                <Stack direction="column" gap={2} ml="2vw">
                  <Stack direction="row" gap={2}>
                    <ThreeCompartmentSummaryCard
                      title={"実績AC"}
                      mainValue={210000}
                      mainUnit={"円"}
                      sub1Value={`${sampleNum1.toLocaleString()}円`}
                      sub1ChipName={"生保"}
                      sub2Value={`${sampleNum2.toLocaleString()}円`}
                      sub2ChipName={"損保"}
                      cardFlex={1.8}
                    />
                    <ThreeCompartmentSummaryCard
                      title={"契約件数"}
                      mainValue={23}
                      mainUnit={"件"}
                      sub1Value={"10件"}
                      sub1ChipName={"生保"}
                      sub2Value={"12件"}
                      sub2ChipName={"損保"}
                      cardFlex={1.5}
                    />
                    <SimpleSummaryCard
                      title={"成約率"}
                      mainValue={54}
                      mainUnit={"%"}
                      subValue={"( 9/18件 )"}
                    />
                    <SimpleSummaryCard
                      title={"ありがとう率"}
                      mainValue={67}
                      mainUnit={"%"}
                      subValue={"( 11/18件 )"}
                    />
                    <SimpleSummaryCard
                      title={"申込残"}
                      mainValue={3}
                      mainUnit={"件"}
                      subValue={""}
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
