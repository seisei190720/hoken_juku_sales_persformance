import React from "react";
import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend,
} from "recharts";
import { FC } from "react";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { blue } from "@mui/material/colors";

type Props = {};

const ConsultContentPieChart: FC<Props> = ({}) => {
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
  const data = [
    { name: "[新規]生保", value: 3 },
    { name: "[新規]損保", value: 4 },
    { name: "[新規]その他", value: 2 },
    { name: "[既契約]生保", value: 1 },
    { name: "[既契約]損保", value: 4 },
    { name: "[既契約]その他", value: 2 },
  ];

  const RADIAN = Math.PI / 180;
  // カスタムラベル描画関数のプロパティ型定義
  interface CustomizedLabelProps {
    cx: number;
    cy: number;
    midAngle: number;
    innerRadius: number;
    outerRadius: number;
    percent: number;
    index: number;
  }
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }: CustomizedLabelProps) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  return (
    <Card sx={{ padding: 2, borderRadius: "12px", flex: 1 }}>
      <Stack gap={2} padding={1}>
        <Stack direction="row">
          <Typography variant="h6" color={blue[600]}>
            {"相談内容"}
          </Typography>
        </Stack>
        <Stack
          direction="row"
          justifyContent="center"
          width="100%"
          height="300px"
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Legend />
              <Pie
                dataKey="value"
                isAnimationActive={true}
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                fill="#8884d8"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Stack>
      </Stack>
    </Card>
  );
};

export default ConsultContentPieChart;
