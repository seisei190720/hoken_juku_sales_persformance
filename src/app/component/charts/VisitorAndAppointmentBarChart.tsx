import { FC } from "react";
import Stack from "@mui/material/Stack";
import { green, orange, blue } from "@mui/material/colors";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import LoadingCard from "../cards/LoadingCard";

type Props = {
  values:
    | {
        name: string;
        新規数: number;
        既契約数: number;
        次アポ数: number;
        nextAppointmentPercent: number;
      }[]
    | undefined;
};

const VisitorAndAppointmentBarChart: FC<Props> = ({ values }) => {
  if (!values) return <LoadingCard height={400} flex={2} />;
  return (
    <Card sx={{ padding: 2, borderRadius: "12px", flex: 2, gap: 2 }}>
      <Typography variant="h6" color={blue[600]}>
        {"来店者数 & 次アポ取得数"}
      </Typography>
      <Stack
        direction="row"
        justifyContent="center"
        width="100%"
        height="300px"
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
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
            <YAxis label={{ value: "人数", angle: -90, dx: -20 }} />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="新規数"
              stackId="a"
              fill={green[300]}
              stroke={green[700]}
              // strokeWidth={2}
            />
            <Bar
              dataKey="既契約数"
              stackId="a"
              fill={orange[300]}
              stroke={orange[700]}
              // strokeWidth={2}
            />
            <Bar
              dataKey="次アポ数"
              fill={blue[300]}
              stroke={blue[700]}
              // strokeWidth={2}
            />
          </BarChart>
        </ResponsiveContainer>
      </Stack>
    </Card>
  );
};

export default VisitorAndAppointmentBarChart;
