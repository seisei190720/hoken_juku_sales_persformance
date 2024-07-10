import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
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
  userId: string;
  routeMst: RouteMst[];
  productMst: ProductMst[];
  companyMst: CompanyMst[];
  consultContentMst: ConsultContentMst[];
  canEdit: boolean;
};

const Visitor: FC<Props> = ({
  userId,
  routeMst,
  productMst,
  companyMst,
  consultContentMst,
  canEdit,
}) => {
  const [targetMonth, setTargetMonth] = useState<string | null>(null);
  const [openFormDialog, setOpenFormDialog] = useState(false);
  const {
    salesResultData,
    postVisitorData,
    updateSalesResultData,
    deleteSalesResultData,
  } = useSalesResultApi(userId, {
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

  const [openSnackBar, setOpenSnackBar] = useState(false);
  const handleClickSnacBar = () => {
    setOpenSnackBar(true);
  };
  const handleCloseSnacBar = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackBar(false);
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
          {canEdit && (
            <Button variant="contained" onClick={handleClickOpen}>
              来店記録を追加する
            </Button>
          )}
        </Stack>
        <VisitorList
          salesResults={salesResultData || []}
          productMst={productMst}
          companyMst={companyMst}
          routeMst={routeMst}
          consultContentMst={consultContentMst}
          updateSalesResultData={updateSalesResultData}
          deleteSalesResultData={deleteSalesResultData}
          canEdit={canEdit}
        />
      </Stack>
      {openFormDialog && (
        <VisitorFormDialog
          openFormDialog={openFormDialog}
          handleClose={handleClose}
          routeMst={routeMst}
          consultContentMst={consultContentMst}
          postVisitorData={postVisitorData}
          handleClickSnacBar={handleClickSnacBar}
        />
      )}
      <Snackbar
        open={openSnackBar}
        autoHideDuration={6000}
        onClose={handleCloseSnacBar}
      >
        <Alert
          onClose={handleCloseSnacBar}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          保存が完了しました
        </Alert>
      </Snackbar>
    </>
  );
};

export default Visitor;
