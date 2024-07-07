import React, { PureComponent } from "react";
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
} from "recharts";
import { FC } from "react";
import Card from "@mui/material/Card";
import { blue, yellow } from "@mui/material/colors";
import { RouteMst } from "@/app/types";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

type Props = {
  routeMst: RouteMst[];
};

const VisitorBarChart: FC<Props> = ({ routeMst }) => {
  const test = routeMst.map((m) => {
    return {
      name: m.name,
      人数: 10,
    };
  });
  return (
    <Card sx={{ padding: 2, borderRadius: "12px", flex: 2 }}>
      <Stack gap={4} padding={1}>
        <Stack direction="row">
          <Typography variant="h6" color={blue[600]}>
            {"経路別来店者数"}
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
              data={test}
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
                fill={blue[300]}
                activeBar={<Rectangle fill={blue[100]} stroke={yellow[300]} />}
              />
            </BarChart>
          </ResponsiveContainer>
        </Stack>
      </Stack>
    </Card>
  );
};

export default VisitorBarChart;
