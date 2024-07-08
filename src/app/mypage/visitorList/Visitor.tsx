import { useSalesResultApi } from "@/app/api/useSalesResultApi";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { AuthUser } from "aws-amplify/auth";
import dayjs from "dayjs";
import { FC, useEffect, useState } from "react";
import {
  CompanyMst,
  ConsultContentMst,
  ProductMst,
  RouteMst,
} from "../../types";
import VisitorFormDialog from "./VisitorFormDialog";
import VisitorList from "./VisitorList";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

type Props = {
  user: AuthUser;
  routeMst: RouteMst[];
  productMst: ProductMst[];
  companyMst: CompanyMst[];
  consultContentMst: ConsultContentMst[];
};

const Visitor: FC<Props> = ({
  user,
  routeMst,
  productMst,
  companyMst,
  consultContentMst,
}) => {
  const [targetMonth, setTargetMonth] = useState<string | null>(null);
  const [openFormDialog, setOpenFormDialog] = useState(false);
  const { salesResultData, postVisitorData, updateApplicationsData } =
    useSalesResultApi(user.userId, {
      status: null,
      firstVisitDate: targetMonth,
    });

  const forwardToNextMonth = () => {
    setTargetMonth((v) => dayjs(v).add(1, "month").format("YYYY-MM"));
  };
  const backToLastMonth = () => {
    setTargetMonth((v) => dayjs(v).subtract(1, "month").format("YYYY-MM"));
  };

  const handleClickOpen = () => {
    setOpenFormDialog(true);
  };
  const handleClose = () => {
    setOpenFormDialog(false);
  };

  useEffect(() => {
    setTargetMonth(dayjs().format("YYYY-MM"));
  }, [setTargetMonth]);

  if (!salesResultData) return <CircularProgress />;
  return (
    <>
      <Stack gap={2} p={2} pt={3} ml={2} mr={2}>
        <Stack direction="row" gap={2} justifyContent="space-between">
          <Stack direction="row" alignItems="center">
            <Button onClick={backToLastMonth}>
              <ArrowBackIosIcon />
            </Button>
            <Typography>{targetMonth}</Typography>
            <Button onClick={forwardToNextMonth}>
              <ArrowForwardIosIcon />
            </Button>
          </Stack>
          <Stack direction="row" gap={2}>
            <Button variant="contained" onClick={handleClickOpen}>
              来店記録を追加する
            </Button>
          </Stack>
        </Stack>
        <VisitorList
          salesResults={salesResultData || []}
          productMst={productMst}
          companyMst={companyMst}
          updateApplicationsData={updateApplicationsData}
        />
      </Stack>
      <VisitorFormDialog
        openFormDialog={openFormDialog}
        handleClose={handleClose}
        routeMst={routeMst}
        consultContentMst={consultContentMst}
        postVisitorData={postVisitorData}
      />
    </>
  );
};

export default Visitor;
