import { FC, useCallback, useState } from "react";
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
import CircularProgress from "@mui/material/CircularProgress";

type Props = {
  values:
    | {
        name: string;
        新規数: number;
        既契約数: number;
        次アポ取得数: number;
        nextAppointMentPercent: number;
      }[]
    | undefined;
};

const VisitorAndAppointmentBarChart: FC<Props> = ({ values }) => {
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
        {"メンバー別来店者数"}
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
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="新規数" stackId="a" fill={green[400]} />
            <Bar dataKey="既契約数" stackId="a" fill={orange[400]} />
            <Bar dataKey="次アポ取得数" fill={blue[400]} />
            {/* 責任挙績が追加できるようになったら、↓でグラフに表示する */}
            {/* <Scatter dataKey="cnt" fill="red" /> */}
          </BarChart>
        </ResponsiveContainer>
      </Stack>
    </Card>
  );
};

export default VisitorAndAppointmentBarChart;
