import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Button from "@mui/material/Button";

type Props = {
  targetMonth: string;
  setTargetMonth: Dispatch<SetStateAction<string>>;
};

const TargetMonthButtons: FC<Props> = ({ targetMonth, setTargetMonth }) => {
  const forwardToNextMonth = () => {
    setTargetMonth((v) => dayjs(v).add(1, "month").format("YYYY-MM"));
  };
  const backToLastMonth = () => {
    setTargetMonth((v) => dayjs(v).subtract(1, "month").format("YYYY-MM"));
  };
  const moveToCurrentMonth = () => {
    setTargetMonth(dayjs().format("YYYY-MM"));
  };
  return (
    <>
      <Stack direction="row" alignItems="center" mr={5}>
        <Button onClick={backToLastMonth}>
          <ArrowBackIosIcon />
        </Button>
        <Typography variant="h6">
          {dayjs(targetMonth).format("YYYY年MM月")}
        </Typography>
        <Button>
          <ArrowForwardIosIcon onClick={forwardToNextMonth} />
        </Button>
        <Button
          variant="outlined"
          onClick={moveToCurrentMonth}
          disabled={targetMonth === dayjs().format("YYYY-MM")}
        >
          今月に戻る
        </Button>
      </Stack>
    </>
  );
};

export default TargetMonthButtons;
