import { FC, useCallback, useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import { green, grey, orange, red } from "@mui/material/colors";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import Card from "@mui/material/Card";
import { blue, yellow } from "@mui/material/colors";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import { YearlyVisitorAndNextAppointmentType } from "../hooks/useYearlyMemberComposition";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

type Props = {
  title: string;
  values: YearlyVisitorAndNextAppointmentType[] | undefined;
};
type ChartViewMode = "visitorBreakdown" | "nextAppointor";

const YearlyVisitorAreaChart: FC<Props> = ({ title, values }) => {
  const [chartViewMode, setViewChartMode] =
    useState<ChartViewMode>("visitorBreakdown");

  const updateViewMode = useCallback(
    (event: React.SyntheticEvent, nextView: string) => {
      if (nextView !== null) {
        setViewChartMode(nextView as ChartViewMode);
      }
    },
    []
  );
  if (!values)
    return (
      <Card
        sx={{
          padding: 2,
          borderRadius: "12px",
          flex: 2,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: 400,
        }}
      >
        <CircularProgress />
      </Card>
    );

  return (
    <Card sx={{ padding: 2, borderRadius: "12px", flex: 2, gap: 2 }}>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h6" color={blue[600]}>
          {title}
        </Typography>
        <ToggleButtonGroup
          size="small"
          color="primary"
          exclusive
          value={chartViewMode}
          onChange={updateViewMode}
          aria-label="sales-result-chart-mode-tab"
        >
          <ToggleButton value="visitorBreakdown">来店者内訳</ToggleButton>
          <ToggleButton value="nextAppointor">次アポ数</ToggleButton>
        </ToggleButtonGroup>
      </Stack>
      <Stack
        direction="row"
        justifyContent="center"
        width="100%"
        height="300px"
      >
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            width={500}
            height={400}
            data={values}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area
              dataKey={
                chartViewMode === "visitorBreakdown" ? "既契約数" : "全体数"
              }
              stackId="1"
              stroke={
                chartViewMode === "visitorBreakdown" ? orange[400] : red[400]
              }
              fill={
                chartViewMode === "visitorBreakdown" ? orange[200] : red[200]
              }
            />
            <Area
              dataKey={
                chartViewMode === "visitorBreakdown" ? "新規数" : "次アポ数"
              }
              stackId={chartViewMode === "visitorBreakdown" ? "1" : "2"}
              stroke={
                chartViewMode === "visitorBreakdown" ? green[400] : blue[400]
              }
              fill={
                chartViewMode === "visitorBreakdown" ? green[200] : blue[200]
              }
            />
          </AreaChart>
        </ResponsiveContainer>
      </Stack>
    </Card>
  );
};
export default YearlyVisitorAreaChart;
