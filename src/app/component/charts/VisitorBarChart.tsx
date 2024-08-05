import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Rectangle,
  Cell,
} from "recharts";
import { FC } from "react";
import Card from "@mui/material/Card";
import { blue, yellow } from "@mui/material/colors";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import LoadingCard from "../cards/LoadingCard";

export type VisitorBarChartType = {
  name: string;
  人数: number;
  color: string;
};
type Props = {
  values: VisitorBarChartType[] | undefined;
};

const VisitorBarChart: FC<Props> = ({ values }) => {
  if (!values) return <LoadingCard height={400} flex={2} />;
  return (
    <Card sx={{ padding: 2, borderRadius: "12px", flex: 2 }}>
      <Stack gap={4} padding={1}>
        <Stack direction="row">
          <Typography variant="h6" color={blue[600]}>
            {"来店者数 [経路別]"}
          </Typography>
        </Stack>
        <Stack
          direction="row"
          justifyContent="center"
          width="100%"
          height="300px"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={values}
              margin={{
                top: 5,
                right: 50,
                left: 20,
                bottom: 5,
              }}
            >
              {/* <CartesianGrid strokeDasharray="3 3" /> */}
              <CartesianGrid />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="人数"
                fill={blue[600]}
                activeBar={<Rectangle fill={blue[100]} stroke={yellow[300]} />}
              >
                {values.map((v, index) => (
                  <Cell key={`cell-${index}`} cursor="pointer" fill={v.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Stack>
      </Stack>
    </Card>
  );
};

export default VisitorBarChart;
