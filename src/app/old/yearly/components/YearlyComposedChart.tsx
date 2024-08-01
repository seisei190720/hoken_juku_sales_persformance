import { FC, useCallback, useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import { green, grey, orange, pink, red } from "@mui/material/colors";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Bar,
  Line,
  ComposedChart,
} from "recharts";
import Card from "@mui/material/Card";
import { blue, yellow } from "@mui/material/colors";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import { CountAndPercentType } from "@/app/old/store/hooks/useStoreAchievementData";

type Props = {
  title: string;
  values: CountAndPercentType[] | undefined;
  barStroleColor: string;
  barFillColor: string;
};

const YearlyComposedChart: FC<Props> = ({
  title,
  values,
  barStroleColor,
  barFillColor,
}) => {
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
      <Typography variant="h6" color={blue[600]}>
        {title}
      </Typography>
      <Stack
        direction="row"
        justifyContent="center"
        width="100%"
        height="300px"
      >
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            width={500}
            height={400}
            data={values}
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20,
            }}
          >
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis dataKey="name" />
            <YAxis
              yAxisId={1}
              orientation="right"
              label={{ value: "率(%)", angle: -90, dx: 20 }}
            />
            <YAxis
              yAxisId={2}
              domain={[0, 5]}
              // tickCount={6}
              label={{ value: "数(件)", angle: -90, dx: -20 }}
            />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="件数"
              yAxisId={2}
              barSize={40}
              fill={barFillColor}
              stroke={barStroleColor}
            />
            <Line
              dataKey="率"
              yAxisId={1}
              stroke={orange[200]}
              strokeWidth={2}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </Stack>
    </Card>
  );
};
export default YearlyComposedChart;
