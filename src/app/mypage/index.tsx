import { AuthUser } from "@aws-amplify/auth/cognito";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import { FC, useEffect, useState } from "react";
import { useMockData } from "../mocks";
import IndividualSalesResults from "./IndividualSalesResults";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { resolveYear, useSalesResultApi } from "../api/useSalesResultApi";
import Button from "@mui/material/Button";

type Props = {
  userId: string;
};

const MyPage: FC<Props> = ({ userId }) => {
  const { routeMst, consultContentMst, productMst, companyMst, statusMst } =
    useMockData();
  const [targetMonth, setTargetMonth] = useState<string | null>(null);

  const {
    salesResultData,
    postVisitorData,
    updateSalesResultData,
    deleteSalesResultData,
    mutate,
  } = useSalesResultApi(userId, {
    status: null,
    year: resolveYear(targetMonth),
    firstVisitDate: targetMonth,
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
        <IndividualSalesResults
          userId={userId}
          targetMonth={targetMonth}
          salesResultData={salesResultData}
          postVisitorData={postVisitorData}
          updateSalesResultData={updateSalesResultData}
          deleteSalesResultData={deleteSalesResultData}
          mutateSalesResultData={mutate}
          routeMst={routeMst}
          productMst={productMst}
          companyMst={companyMst}
          consultContentMst={consultContentMst}
          statusMst={statusMst}
          canEdit={true}
        />
      </Stack>
    </>
  );
};

export default MyPage;
