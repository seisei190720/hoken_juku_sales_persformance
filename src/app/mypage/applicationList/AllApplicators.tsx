import { FC, useEffect, useState } from "react";
import { CompanyMst, ProductMst, StatusMst } from "@/app/types";
import { AuthUser } from "aws-amplify/auth";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import NotYetEstablished from "./NotYetEstablished";
import TargetMonthApplicators from "./TargetMonthApplicators";

type Props = {
  user: AuthUser;
  productMst: ProductMst[];
  companyMst: CompanyMst[];
  statusMst: StatusMst[];
};

const AllApplicators: FC<Props> = ({
  user,
  productMst,
  companyMst,
  statusMst,
}) => {
  const [targetMonth, setTargetMonth] = useState<string | null>(null);
  const [showInProgressApp, setShowInProgressApp] = useState<boolean>(false);

  useEffect(() => {
    setTargetMonth(dayjs().format("YYYY-MM"));
  }, [setTargetMonth]);

  const forwardToNextMonth = () => {
    setTargetMonth((v) => dayjs(v).add(1, "month").format("YYYY-MM"));
  };
  const backToLastMonth = () => {
    setTargetMonth((v) => dayjs(v).subtract(1, "month").format("YYYY-MM"));
  };
  const moveToCurrentMonth = () => {
    setTargetMonth(dayjs().format("YYYY-MM"));
  };

  const toggleShowInProgressApp = () => {
    setShowInProgressApp((pre) => !pre);
  };

  return (
    <>
      <Stack gap={2} p={4}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography variant="h5">申込者一覧</Typography>
            <Button onClick={backToLastMonth} disabled={showInProgressApp}>
              <ArrowBackIosIcon />
            </Button>
            <Typography color={showInProgressApp ? "grey" : "black"}>
              {targetMonth}
            </Typography>
            <Button onClick={forwardToNextMonth} disabled={showInProgressApp}>
              <ArrowForwardIosIcon />
            </Button>
            <Button
              variant="outlined"
              onClick={moveToCurrentMonth}
              disabled={
                targetMonth === dayjs().format("YYYY-MM") || showInProgressApp
              }
            >
              今月に戻る
            </Button>
          </Stack>
          <FormControlLabel
            control={
              <Switch
                value={showInProgressApp}
                onClick={toggleShowInProgressApp}
              />
            }
            label="未成立のみ表示する"
          />
        </Stack>
        {showInProgressApp ? (
          <NotYetEstablished
            user={user}
            productMst={productMst}
            companyMst={companyMst}
            statusMst={statusMst}
          />
        ) : (
          <TargetMonthApplicators
            user={user}
            targetMonth={targetMonth}
            productMst={productMst}
            companyMst={companyMst}
            statusMst={statusMst}
          />
        )}
      </Stack>
    </>
  );
};

export default AllApplicators;
