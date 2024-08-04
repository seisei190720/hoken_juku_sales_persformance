import { FC } from "react";
import Stack from "@mui/material/Stack";
import { grey, orange, red } from "@mui/material/colors";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Bar,
  ComposedChart,
  Scatter,
} from "recharts";
import Card from "@mui/material/Card";
import { blue } from "@mui/material/colors";
import Typography from "@mui/material/Typography";
import { BudgetAndAchievementExpectByMemberType } from "../../store/hooks/useStoreTopComposition";
import LoadingCard from "../cards/LoadingCard";

type Props = {
  title: string;
  values: BudgetAndAchievementExpectByMemberType[] | undefined;
};

const BudgetAndAchievementExpectBarChart: FC<Props> = ({ title, values }) => {
  if (!values) return <LoadingCard height={400} flex={2} />;

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
              dataKey="見込額"
              yAxisId={2}
              barSize={40}
              fill={orange[300]}
              stroke={orange[700]}
              stackId="a"
            />
            <Bar
              dataKey="不足額"
              yAxisId={2}
              barSize={40}
              fill={grey[200]}
              stroke={grey[400]}
              stackId="a"
            />
            <Scatter
              yAxisId={2}
              dataKey="予算"
              fill={red[400]}
              shape="square"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </Stack>
    </Card>
  );
};
export default BudgetAndAchievementExpectBarChart;
