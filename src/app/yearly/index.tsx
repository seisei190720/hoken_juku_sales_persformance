import { AuthUser } from "@aws-amplify/auth/cognito";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import { FC, useEffect, useState } from "react";
import { useMockData } from "../mocks";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Button from "@mui/material/Button";
import { resolveYear, useSalesResultApi } from "../api/useSalesResultApi";
import { useApplicationApi } from "../api/useApplicationApi";
import YearlyResults from "./YearlyResults";

type Props = {
  user: AuthUser;
};

const YearlyPage: FC<Props> = ({ user }) => {
  const {
    members,
    routeMst,
    consultContentMst,
    productMst,
    companyMst,
    statusMst,
  } = useMockData();
  const [targetMonth, setTargetMonth] = useState<string | null>(null);
  const { salesResultData } = useSalesResultApi(null, {
    status: null,
    year: "2024",
    firstVisitDate: null,
  });

  const { applicationData } = useApplicationApi({
    userId: null,
    year: "2024",
    establishDate: null,
  });

  const forwardToNextMonth = () => {
    setTargetMonth((v) => dayjs(v).add(1, "month").format("YYYY-MM"));
  };
  const backToLastMonth = () => {
    setTargetMonth((v) => dayjs(v).subtract(1, "month").format("YYYY-MM"));
  };
  const moveToCurrentMonth = () => {
    setTargetMonth(dayjs().format("YYYY-MM"));
  };

  useEffect(() => {
    setTargetMonth(dayjs().format("YYYY-MM"));
  }, [setTargetMonth]);

  return (
    <>
      <Stack gap={1} sx={{ width: "100%" }}>
        <Stack direction="row" alignItems="center" gap={1}>
          <Button onClick={backToLastMonth}>
            <ArrowBackIosIcon />
          </Button>
          <Typography variant="h5">
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
        <YearlyResults
          userId={user.userId}
          salesResultData={salesResultData}
          applicationData={applicationData}
          routeMst={routeMst}
          consultContentMst={consultContentMst}
          productMst={productMst}
          companyMst={companyMst}
          statusMst={statusMst}
        />
      </Stack>
    </>
  );
};

export default YearlyPage;
