import { FC } from "react";
import { IndividualSalesResult } from "../types";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Stack from "@mui/material/Stack";

type Props = {
  openDialog: boolean;
  handleClose: () => void;
  titleDeleteTarget: string;
  dialogMessage: string;
  salesResult: IndividualSalesResult | undefined;
  updateApplicationsData: (newData: IndividualSalesResult) => Promise<void>;
  handleClickSnacBar: () => void;
};

const DeleteApplicationDialog: FC<Props> = ({
  openDialog,
  handleClose,
  titleDeleteTarget,
  dialogMessage,
  salesResult,
  updateApplicationsData,
  handleClickSnacBar,
}) => {
  const deleteApplication = () => {
    if (!salesResult) return;
    updateApplicationsData({
      ...salesResult,
      applications: [],
    });
  };

  if (!salesResult) return <></>;
  return (
    <Dialog open={openDialog} onClose={handleClose} fullWidth>
      <DialogTitle>{`${salesResult.name}さんの${titleDeleteTarget}を削除します`}</DialogTitle>
      <DialogContent>
        <DialogContentText>{dialogMessage}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Stack gap={1} direction="row">
          <Button onClick={handleClose}>キャンセル</Button>
          <Button
            color="error"
            variant="contained"
            onClick={() => {
              deleteApplication();
              handleClickSnacBar();
              handleClose();
            }}
          >
            削除
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteApplicationDialog;
