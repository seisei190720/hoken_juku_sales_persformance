import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import { FC, useState } from "react";
import {
  CompanyMst,
  ConsultContentMst,
  IndividualSalesResult,
  NewVisitor,
  ProductMst,
  RouteMst,
} from "../../../types";
import VisitorFormDialog from "./VisitorFormDialog";
import VisitorList from "./VisitorList";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

type Props = {
  userId: string;
  salesResultData: IndividualSalesResult[] | undefined;
  postVisitorData: (newData: NewVisitor) => Promise<void>;
  updateSalesResultData: (newData: IndividualSalesResult) => Promise<void>;
  deleteSalesResultData: (deleteTarget: IndividualSalesResult) => Promise<void>;
  routeMst: RouteMst[];
  productMst: ProductMst[];
  companyMst: CompanyMst[];
  consultContentMst: ConsultContentMst[];
  canEdit: boolean;
};

const Visitor: FC<Props> = ({
  userId,
  salesResultData,
  postVisitorData,
  updateSalesResultData,
  deleteSalesResultData,
  routeMst,
  productMst,
  companyMst,
  consultContentMst,
  canEdit,
}) => {
  const [openFormDialog, setOpenFormDialog] = useState(false);

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

  if (!salesResultData) return <CircularProgress />;
  return (
    <>
      <Stack gap={2}>
        <Stack direction="row" gap={2} justifyContent="flex-end">
          {canEdit && (
            <Fab
              variant="extended"
              size="medium"
              color="primary"
              onClick={handleClickOpen}
              sx={{ position: "fixed", bottom: 72, right: 56 }}
            >
              <AddIcon sx={{ mr: 1 }} />
              新規追加
            </Fab>
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
