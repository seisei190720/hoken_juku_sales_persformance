import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import { Dispatch, FC, SetStateAction } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Button from "@mui/material/Button";

type Props = {
  targetYear: string;
  setTargetYear: Dispatch<SetStateAction<string>>;
};

const TargetYearButtons: FC<Props> = ({ targetYear, setTargetYear }) => {
  const forwardToNextMonth = () => {
    setTargetYear((v) => dayjs(v).add(1, "year").format("YYYY"));
  };
  const backToLastMonth = () => {
    setTargetYear((v) => dayjs(v).subtract(1, "year").format("YYYY"));
  };
  const moveToCurrentMonth = () => {
    setTargetYear(dayjs().format("YYYY"));
  };
  return (
    <>
      <Stack direction="row" alignItems="center" mr={5}>
        <Button onClick={backToLastMonth}>
          <ArrowBackIosIcon />
        </Button>
        <Typography variant="h6">
          {dayjs(targetYear).format("YYYY年度")}
        </Typography>
        <Button>
          <ArrowForwardIosIcon onClick={forwardToNextMonth} />
        </Button>
        <Button
          variant="outlined"
          onClick={moveToCurrentMonth}
          disabled={targetYear === dayjs().format("YYYY-MM")}
        >
          今年度に戻る
        </Button>
      </Stack>
    </>
  );
};

export default TargetYearButtons;
