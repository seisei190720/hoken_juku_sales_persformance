import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { blue, grey, orange, red } from "@mui/material/colors";
import Stack from "@mui/material/Stack";
import { FC, useCallback, useMemo, useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { TopicBudgetAndAchievementType } from "../../top/hooks/useTopicAchievementComposition";

type Props = {
  values: TopicBudgetAndAchievementType;
};
const BudgetAchievementHalfPieChart: FC<Props> = ({ values }) => {
  const RADIAN = Math.PI / 180;
  const data = useMemo(
    () => [
      { name: "実績", value: values.実績, color: blue[300] },
      { name: "未達分", value: values.未達額, color: grey[300] },
    ],
    [values]
  );
  // const data = [
  //   { name: "実績", value: 10000, color: blue[300] },
  //   { name: "未達分", value: 3000, color: grey[300] },
  // ];
  const cx = 100;
  const cy = 80;
  const iR = 50;
  const oR = 70;

  const needle = (
    value: number,
    data: any[],
    cx: number,
    cy: number,
    iR: number,
    oR: number,
    color: string
  ) => {
    let total = 0;
    data.forEach((v) => {
      total += v.value;
    });
    const ang = 180.0 * (1 - value / total);
    const length = (iR + 2 * oR) / 3;
    const sin = Math.sin(-RADIAN * ang);
    const cos = Math.cos(-RADIAN * ang);
    const r = 5;
    const x0 = cx + 5;
    const y0 = cy + 5;
    const xba = x0 + r * sin;
    const yba = y0 - r * cos;
    const xbb = x0 - r * sin;
    const ybb = y0 + r * cos;
    const xp = x0 + length * cos;
    const yp = y0 + length * sin;

    return [
      <circle cx={x0} cy={y0} r={r} fill={color} stroke="none" />,
      <path
        d={`M${xba} ${yba}L${xbb} ${ybb} L${xp} ${yp} L${xba} ${yba}`}
        stroke="#none"
        fill={color}
      />,
    ];
  };
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }: {
    cx: number;
    cy: number;
    midAngle: number;
    innerRadius: number;
    outerRadius: number;
    percent: number;
    index: number;
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.1;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill={grey[800]}
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {/* {`${(percent * 100).toFixed(0)}%`} */}
        {`${data[index].value.toLocaleString()}`}
      </text>
    );
  };
  return (
    <>
      <Box height={90} flex={1}>
        <ResponsiveContainer height="100%" width="100%">
          <PieChart>
            {/* <PieChart width={300} height={300}> */}
            <Pie
              data={data}
              startAngle={180}
              endAngle={0}
              cx="50%"
              cy="100%"
              labelLine={false}
              label={renderCustomizedLabel}
              innerRadius={50}
              outerRadius={75}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>

            {/* {needle(10000, data, cx, cy, iR, oR, orange[400])} */}
          </PieChart>
        </ResponsiveContainer>
        <Stack
          // sx={{
          //   x: "25%",
          //   y: "80%",
          //   dominantBaseline: "central",
          // }}
          direction="row"
          justifyContent="center"
        >
          <Typography
          // sx={{
          //   x: "25%",
          //   y: "80%",
          //   dominantBaseline = "central",
          // }}
          // fill={grey[800]}
          // textAnchor={x > cx ? "start" : "end"}
          >
            {/* {`${(percent * 100).toFixed(0)}%`} */}
            {`達成率：${values.達成率}%`}
          </Typography>
        </Stack>
      </Box>
    </>
  );
};
export default BudgetAchievementHalfPieChart;
