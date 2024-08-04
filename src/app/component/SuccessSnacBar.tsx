import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { Dispatch, FC, SetStateAction } from "react";

type Props = {
  openSnackBar: boolean;
  setOpenSnackBar: Dispatch<SetStateAction<boolean>>;
  message: string;
};

const SuccessSnacBar: FC<Props> = ({
  openSnackBar,
  setOpenSnackBar,
  message,
}) => {
  const handleCloseSnacBar = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackBar(false);
  };

  return (
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
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SuccessSnacBar;
