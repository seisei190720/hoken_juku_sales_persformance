import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { AuthUser } from "aws-amplify/auth";
import { useApplicationApi } from "../api/useApplicationApi";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { LineChart, Line } from "recharts";

type Props = {
  user: AuthUser;
};
const Dashboard: FC<Props> = ({ user }) => {
  const data = [
    { name: "page A", uv: 4000 },
    { name: "Page B", uv: 3000 },
    { name: "Page C", uv: 2000 },
    { name: "Page D", uv: 2780 },
    { name: "Page E", uv: 1890 },
    { name: "Page F", uv: 2390 },
    { name: "Page G", uv: 3490 },
  ];
  return (
    <>
      <Stack gap={2} sx={{ width: "100%" }}>
        <Typography>ダッシュボードのページです</Typography>
        <Button variant="outlined">Outlined</Button>{" "}
        <LineChart width={400} height={400} data={data}>
          <Line type="monotone" dataKey="uv" stroke="#8884d8" />
        </LineChart>
      </Stack>
    </>
  );
};

export default Dashboard;
