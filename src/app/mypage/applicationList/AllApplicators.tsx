import { FC, useEffect, useState } from "react";
import { CompanyMst, ProductMst, StatusMst } from "@/app/types";
import { AuthUser } from "aws-amplify/auth";
import ApplicationList from "./ApplicationList";
import { useSalesResultApi } from "@/app/api/useSalesResultApi";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";

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
  const { salesResultData, updateApplicationsData } = useSalesResultApi(
    user.userId,
    { status: null, firstVisitDate: targetMonth }
  );

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

  return (
    <>
      <Stack gap={2} p={4}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Typography variant="h5">申込者一覧</Typography>
          <Button onClick={backToLastMonth}>＜</Button>
          <Typography>{targetMonth}</Typography>
          <Button onClick={forwardToNextMonth}>＞</Button>
          <Button
            onClick={moveToCurrentMonth}
            variant="outlined"
            disabled={targetMonth === dayjs().format("YYYY-MM")}
          >
            今月に戻る
          </Button>
        </Stack>
        <ApplicationList
          user={user}
          productMst={productMst}
          companyMst={companyMst}
          statusMst={statusMst}
          salesResultData={salesResultData}
          updateApplicationsData={updateApplicationsData}
        />
      </Stack>
    </>
  );
};

export default AllApplicators;
