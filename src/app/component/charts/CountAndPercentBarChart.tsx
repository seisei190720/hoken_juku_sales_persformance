import { FC } from "react";
import Stack from "@mui/material/Stack";
import { grey, orange } from "@mui/material/colors";
import {
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Line,
  ComposedChart,
} from "recharts";
import Card from "@mui/material/Card";
import { blue, yellow } from "@mui/material/colors";
import Typography from "@mui/material/Typography";
import LoadingCard from "../cards/LoadingCard";

type Props = {
  title: string;
  values:
    | {
        name: string;
        件数: number;
        率: number;
      }[]
    | undefined;
};

const CountAndPercentBarChart: FC<Props> = ({ title, values }) => {
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
            //   width={500}
            //   height={300}
            data={values}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
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
              fill={blue[200]}
              stroke={blue[600]}
            />
            <Line
              dataKey="率"
              yAxisId={1}
              fill={orange[200]}
              stroke={orange[400]}
              strokeWidth={2}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </Stack>
    </Card>
  );
};

export default CountAndPercentBarChart;
