import { FC, useEffect } from "react";
import Stack from "@mui/material/Stack";
import { green, grey, orange } from "@mui/material/colors";
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

type Props = {
  title: string;
  values: { month: string; 新規数: number; 既契約数: number }[] | undefined;
};

const VisitorAreaChart: FC<Props> = ({ title, values }) => {
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
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Area
              // type="monotone"
              dataKey="既契約数"
              stackId="1"
              stroke={orange[400]}
              fill={orange[200]}
            />
            <Area
              // type="monotone"
              dataKey="新規数"
              stackId="1"
              stroke={green[400]}
              fill={green[200]}
            />
          </AreaChart>
        </ResponsiveContainer>
      </Stack>
    </Card>
  );
};
export default VisitorAreaChart;
