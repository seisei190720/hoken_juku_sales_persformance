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

type Props = {
  values:
    | {
        name: string;
        "実績(円)": number;
        color: string;
      }[]
    | undefined;
};

const ApplicatorBarChart: FC<Props> = ({ values }) => {
  if (!values) return <LoadingCard height={400} flex={1} />;
  return (
    <Card sx={{ padding: 2, borderRadius: "12px", flex: 1 }}>
      <Stack justifyContent="space-between" height="100%" gap={1}>
        <Typography variant="h6" color={blue[600]}>
          {"実績 [商品別]"}
        </Typography>
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
                dataKey="実績(円)"
                fill={blue[300]}
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

export default ApplicatorBarChart;
