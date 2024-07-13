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
  Area,
  ComposedChart,
} from "recharts";
import Card from "@mui/material/Card";
import { blue, yellow } from "@mui/material/colors";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";

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
            <Area dataKey="率" fill={orange[200]} stroke={orange[400]} />
            <Bar dataKey="件数" fill={blue[400]} />
          </ComposedChart>
        </ResponsiveContainer>
      </Stack>
    </Card>
  );
};

export default CountAndPercentBarChart;
