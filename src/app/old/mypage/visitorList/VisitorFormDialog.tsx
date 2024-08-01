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
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { FC } from "react";
import { ConsultContentMst, NewVisitor, RouteMst } from "../../../types";
import { useNewVisitor } from "./hooks/useNewVisitor";

type Props = {
  openFormDialog: boolean;
  handleClose: () => void;
  routeMst: RouteMst[];
  consultContentMst: ConsultContentMst[];
  postVisitorData: (newData: NewVisitor) => Promise<void>;
  handleClickSnacBar: () => void;
};

const VisitorFormDialog: FC<Props> = ({
  openFormDialog,
  handleClose,
  routeMst,
  consultContentMst,
  postVisitorData,
  handleClickSnacBar,
}) => {
  const {
    newVisitorData,
    updateFirstVisitDate,
    updateName,
    updateRoute,
    updateConsultContent,
    updateNextAppointment,
    submitNewVisitor,
  } = useNewVisitor(postVisitorData, routeMst, consultContentMst);

  return (
    <>
      <Dialog
        open={openFormDialog}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          component: "form",
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
              key="visitDate"
              required
              id="visitDate"
              name="visitDate"
              label="来店日"
              value={newVisitorData.firstVisitDate || ""}
              onChange={(e) => updateFirstVisitDate(e.target.value)}
              type="date"
              fullWidth
              variant="standard"
            />
            <TextField
              required
              key="name"
              id="name"
              name="name"
              label="お名前"
              type="text"
              fullWidth
              variant="standard"
              value={newVisitorData.name || ""}
              onChange={(e) => updateName(e.target.value)}
            />
            <FormControl required variant="standard" fullWidth>
              <InputLabel>経路</InputLabel>
              <Select
                key="route"
                labelId="route"
                id="route"
                value={
                  newVisitorData.visitRoute === null
                    ? ""
                    : newVisitorData.visitRoute.id
                }
                label="経路"
                onChange={updateRoute}
              >
                {routeMst.map((r) => (
                  <MenuItem key={`route_${r.id}`} value={r.id}>
                    {r.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl required variant="standard" fullWidth>
              <InputLabel>相談内容</InputLabel>
              <Select
                key="route"
                labelId="consultContent"
                id="consultContent"
                value={
                  newVisitorData.consultContent === null
                    ? ""
                    : newVisitorData.consultContent.id
                }
                label="相談内容"
                onChange={updateConsultContent}
              >
                {consultContentMst.map((r) => (
                  <MenuItem key={`consult_${r.id}`} value={r.id}>
                    {r.name}
                  </MenuItem>
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
            variant="contained"
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
    </>
  );
};

export default VisitorFormDialog;
