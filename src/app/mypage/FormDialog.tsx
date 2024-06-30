import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import dayjs from "dayjs";
import { FC, useCallback, useState } from "react";
import { ConsultContentMst, NewVisitor, RouteMst } from "../types";
import { useNewVisitor } from "./hooks/useNewVisitor";

type Props = {
  openFormDialog: boolean;
  handleClose: () => void;
  routeMst: RouteMst[];
  consultContentMst: ConsultContentMst[];
  postVisitorData: (newData: NewVisitor) => Promise<void>;
};

const FormDialog: FC<Props> = ({
  openFormDialog,
  handleClose,
  routeMst,
  consultContentMst,
  postVisitorData,
}) => {
  const today = dayjs().format("YYYY-MM-DD");
  const {
    newVisitorData,
    updateFirstVisitDate,
    updateName,
    updateRoute,
    updateConsultContent,
    updateNextAppointment,
    submitNewVisitor,
  } = useNewVisitor(postVisitorData, routeMst, consultContentMst);
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

  return (
    <>
      <Dialog
        open={openFormDialog}
        onClose={handleClose}
        maxWidth="md"
        PaperProps={{
          component: "form",
          // onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
          //   event.preventDefault();
          //   const formData = new FormData(event.currentTarget);
          //   const formJson = Object.fromEntries((formData as any).entries());
          //   const email = formJson.email;
          //   console.log(email);
          //   handleClose();
          // },
        }}
      >
        <DialogTitle>来店記録の新規登録</DialogTitle>
        <DialogContent>
          <Stack gap={3}>
            <DialogContentText>
              来店されたお客様の情報を入力してください。登録後にも内容を編集できます。
            </DialogContentText>
            <TextField
              // autoFocus
              required
              id="visitDate"
              name="visitDate"
              label="来店日"
              // defaultValue={today}
              value={newVisitorData.firstVisitDate}
              type="date"
              fullWidth
              variant="standard"
            />
            <TextField
              required
              id="name"
              name="name"
              label="お名前"
              type="text"
              fullWidth
              variant="standard"
              value={newVisitorData.name}
              onChange={(e) => updateName(e.target.value)}
            />
            <FormControl required variant="standard" fullWidth>
              <InputLabel>経路</InputLabel>
              <Select
                labelId="route"
                id="route"
                value={newVisitorData.visitRoute?.id}
                label="経路"
                onChange={updateRoute}
              >
                {routeMst.map((r) => (
                  <MenuItem value={r.id}>{r.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl required variant="standard" fullWidth>
              <InputLabel>相談内容</InputLabel>
              <Select
                labelId="consultContent"
                id="consultContent"
                value={newVisitorData.consultContent?.id}
                label="相談内容"
                onChange={updateConsultContent}
              >
                {consultContentMst.map((r) => (
                  <MenuItem value={r.id}>{r.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControlLabel
              control={
                <Checkbox
                  checked={newVisitorData.nextAppointment}
                  onChange={(e) => updateNextAppointment(e.target.checked)}
                />
              }
              label="次アポ取得済み"
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>キャンセル</Button>
          <Button
            onClick={() => {
              submitNewVisitor();
              handleClose();
              handleClickSnacBar();
            }}
          >
            新規登録
          </Button>
        </DialogActions>
      </Dialog>
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
          来店者の登録が完了しました
        </Alert>
      </Snackbar>
    </>
  );
};

export default FormDialog;
