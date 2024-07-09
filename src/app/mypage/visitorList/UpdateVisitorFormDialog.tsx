import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import CircularProgress from "@mui/material/CircularProgress";
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
import {
  ConsultContentMst,
  IndividualSalesResult,
  RouteMst,
} from "../../types";
import { useUpdateVisitor } from "./hooks/useUpdateVisitors";

type Props = {
  openFormDialog: boolean;
  handleClose: () => void;
  salesResult: IndividualSalesResult | undefined;
  routeMst: RouteMst[];
  consultContentMst: ConsultContentMst[];
  updateSalesResultData: (newData: IndividualSalesResult) => Promise<void>;
  handleClickSnacBar: () => void;
};

const UpdateVisitorFormDialog: FC<Props> = ({
  openFormDialog,
  handleClose,
  salesResult,
  routeMst,
  consultContentMst,
  updateSalesResultData,
  handleClickSnacBar,
}) => {
  const {
    updatedVisitorData,
    updateName,
    updateRoute,
    updateConsultContent,
    updateNextAppointment,
    submitUpdatedVisitor,
  } = useUpdateVisitor(
    salesResult,
    updateSalesResultData,
    routeMst,
    consultContentMst
  );

  if (!updatedVisitorData) return <CircularProgress />;
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
        <DialogTitle>来店記録の編集</DialogTitle>
        <DialogContent>
          <Stack gap={3}>
            <DialogContentText>
              来店されたお客様の情報を編集・更新してください。来店日を編集する場合は、一度本記録を削除してから作り直してください。
            </DialogContentText>
            <TextField
              InputProps={{
                readOnly: true,
              }}
              key="visitDate"
              required
              id="visitDate"
              name="visitDate"
              label="来店日(編集不可)"
              value={updatedVisitorData.firstVisitDate || ""}
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
              value={updatedVisitorData.name || ""}
              onChange={(e) => updateName(e.target.value)}
            />
            <FormControl required variant="standard" fullWidth>
              <InputLabel>経路</InputLabel>
              <Select
                key="route"
                labelId="route"
                id="route"
                value={
                  updatedVisitorData.visitRoute === null
                    ? ""
                    : updatedVisitorData.visitRoute.id
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
                  updatedVisitorData.consultContent === null
                    ? ""
                    : updatedVisitorData.consultContent.id
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
                  checked={updatedVisitorData.nextAppointment}
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
              submitUpdatedVisitor();
              handleClickSnacBar();
              handleClose();
            }}
          >
            更新
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UpdateVisitorFormDialog;
