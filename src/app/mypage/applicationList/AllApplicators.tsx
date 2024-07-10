import { FC, useEffect, useState } from "react";
import { CompanyMst, ProductMst, StatusMst } from "@/app/types";
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
  userId: string;
  productMst: ProductMst[];
  companyMst: CompanyMst[];
  statusMst: StatusMst[];
  canEdit: boolean;
};

const AllApplicators: FC<Props> = ({
  userId,
  productMst,
  companyMst,
  statusMst,
  canEdit,
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
      <Stack gap={2} p={2} pt={3} ml={2} mr={2}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack direction="row" alignItems="center">
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
            userId={userId}
            productMst={productMst}
            companyMst={companyMst}
            statusMst={statusMst}
            canEdit={canEdit}
          />
        ) : (
          <TargetMonthApplicators
            userId={userId}
            targetMonth={targetMonth}
            productMst={productMst}
            companyMst={companyMst}
            statusMst={statusMst}
            canEdit={canEdit}
          />
        )}
      </Stack>
    </>
  );
};

export default AllApplicators;
