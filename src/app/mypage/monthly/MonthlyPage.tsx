import { AuthUser } from "@aws-amplify/auth/cognito";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import { FC, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { red } from "@mui/material/colors";

type Props = {
  userId: string;
  canEdit: boolean;
};
const MonthlyPage: FC<Props> = ({ userId, canEdit }) => {
  return <>月別成果作成中</>;
};
export default MonthlyPage;
