import { FC } from "react";
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
import { BudgetAndAchievementType } from "../hooks/useYearlyConstractComposition";

type Props = {
  title: string;
  values: BudgetAndAchievementType[] | undefined;
};

const YearlyBudgetAndAchievementComposedChart: FC<Props> = ({
  title,
  values,
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
              label={{ value: "実績額", angle: -90, dx: -20 }}
            />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="実績"
              yAxisId={2}
              barSize={40}
              fill={blue[300]}
              stroke={blue[700]}
              stackId="a"
            />
            <Bar
              dataKey="未達額"
              yAxisId={2}
              barSize={40}
              fill={red[200]}
              stroke={red[700]}
              stackId="a"
            />
            <Bar
              dataKey="超過額"
              yAxisId={2}
              barSize={40}
              fill={green[300]}
              stroke={green[700]}
              stackId="a"
            />
            <Line
              dataKey="達成率"
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
export default YearlyBudgetAndAchievementComposedChart;
