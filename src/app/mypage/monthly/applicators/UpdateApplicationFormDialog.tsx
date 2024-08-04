import { FC } from "react";
import {
  CompanyMst,
  IndividualSalesResult,
  ProductMst,
  StatusMst,
} from "../../../types";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useUpdateApplications } from "./hooks/useUpdateApplications";
import IconButton from "@mui/material/IconButton";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import Favorite from "@mui/icons-material/Favorite";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import FormControlLabel from "@mui/material/FormControlLabel";

type Props = {
  openFormDialog: boolean;
  handleClose: () => void;
  salesResult: IndividualSalesResult | undefined;
  productMst: ProductMst[];
  companyMst: CompanyMst[];
  statusMst: StatusMst[];
  updateApplicationsData: (newData: IndividualSalesResult) => Promise<void>;
  handleClickSnacBar: () => void;
};

const UpdateApplicationFormDialog: FC<Props> = ({
  openFormDialog,
  handleClose,
  salesResult,
  productMst,
  companyMst,
  statusMst,
  updateApplicationsData,
  handleClickSnacBar,
}) => {
  const {
    updatedApplications,
    addApplication,
    deleteApplication,
    updateApplicationDate,
    updateProduct,
    updateCompany,
    updateStatus,
    updateFirstYearFee,
    updateInsuranceFee,
    updateEstablishDate,
    thankyouState,
    setThankyouState,
    newRemarks,
    updateRemarks,
    submitUpdatedApplications,
    enableSaveButton,
  } = useUpdateApplications(
    salesResult,
    productMst,
    companyMst,
    statusMst,
    updateApplicationsData
  );

  if (!salesResult) return <></>;
  return (
    <Dialog
      open={openFormDialog}
      onClose={handleClose}
      fullWidth
      maxWidth="lg"
      PaperProps={{
        component: "form",
      }}
    >
      <DialogTitle>{`${salesResult.name}さんの申込情報登録`}</DialogTitle>
      <DialogContent>
        <Stack ml={2} gap={2} direction="column">
          <DialogContentText>申込情報を更新してください。</DialogContentText>
          {updatedApplications.map((app, idx) => {
            return (
              <Stack
                key={`updateApplications_${idx}`}
                gap={2}
                direction="row"
                alignItems="flex-end"
              >
                <Typography variant="h6">{`${idx}.`}</Typography>
                <TextField
                  required={idx === 0}
                  key={`${idx}_applicationDate`}
                  id={`${idx}_applicationDate`}
                  name={`${idx}_applicationDate`}
                  label={idx === 0 && "申込日"}
                  value={app.applicationDate}
                  onChange={(e) => updateApplicationDate(e.target.value, idx)}
                  type="date"
                  fullWidth
                  variant="standard"
                />
                <FormControl required={idx === 0} variant="standard" fullWidth>
                  {idx === 0 && <InputLabel>保険会社</InputLabel>}
                  <Select
                    labelId={`${idx}_company`}
                    id={`${idx}_company`}
                    value={app.company === null ? undefined : app.company.id}
                    label={"保険会社"}
                    onChange={(e) => updateCompany(e, idx)}
                  >
                    {companyMst.map((r, i) => (
                      <MenuItem key={`company_${idx}_${i}`} value={r.id}>
                        {r.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl required={idx === 0} variant="standard" fullWidth>
                  {idx === 0 && <InputLabel>商品</InputLabel>}
                  <Select
                    key={`${idx}_product`}
                    labelId={`${idx}_product`}
                    id={`${idx}_product`}
                    value={app.product === null ? undefined : app.product.id}
                    label={"商品"}
                    onChange={(e) => updateProduct(e, idx)}
                  >
                    {productMst.map((r, i) => (
                      <MenuItem key={`product_${idx}_${i}`} value={r.id}>
                        {r.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField
                  required={idx === 0}
                  key={`${idx}_firstYearFee`}
                  id={`${idx}_firstYearFee`}
                  name={`${idx}_firstYearFee`}
                  label={idx === 0 && "初回手数料"}
                  value={app.firstYearFee || ""}
                  onChange={(e) => updateFirstYearFee(e.target.value, idx)}
                  type="number"
                  fullWidth
                  variant="standard"
                />
                <TextField
                  required={idx === 0}
                  key={`${idx}_insuranceFee`}
                  id={`${idx}_insuranceFee`}
                  name={`${idx}_insuranceFee`}
                  label={idx === 0 && "保険料"}
                  value={app.insuranceFee || ""}
                  onChange={(e) => updateInsuranceFee(e.target.value, idx)}
                  type="number"
                  fullWidth
                  variant="standard"
                />
                <FormControl required={idx === 0} variant="standard" fullWidth>
                  {idx === 0 && <InputLabel>状態</InputLabel>}
                  <Select
                    key={`${idx}_status`}
                    labelId={`${idx}_status`}
                    id={`${idx}_status`}
                    value={app.status?.id}
                    label={"状態"}
                    onChange={(e) => updateStatus(e, idx)}
                  >
                    {statusMst.map((r, i) => (
                      <MenuItem key={`status_${idx}_${i}`} value={r.id}>
                        {r.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField
                  disabled={app.status?.id !== "2"}
                  required={idx === 0}
                  id={`${idx}_establishDate`}
                  name={`${idx}_establishDate`}
                  label={idx === 0 && "契約日"}
                  value={app.establishDate === null ? "" : app.establishDate}
                  onChange={(e) => updateEstablishDate(e.target.value, idx)}
                  type="date"
                  fullWidth
                  variant="standard"
                />
                {updatedApplications.length > 1 && (
                  <IconButton onClick={() => deleteApplication(idx)}>
                    <DeleteIcon />
                  </IconButton>
                )}
              </Stack>
            );
          })}
          <Stack direction="row" justifyContent="space-between">
            <Button
              variant="text"
              startIcon={<AddIcon />}
              onClick={addApplication}
              color="inherit"
            >
              追加
            </Button>
            <FormControlLabel
              control={
                <Checkbox
                  checked={thankyouState}
                  onChange={(e) => setThankyouState(e.target.checked)}
                  icon={<FavoriteBorder />}
                  checkedIcon={<Favorite color="error" />}
                />
              }
              label="ありがとう完了済み"
            />
          </Stack>
        </Stack>
        <Stack mt={1} pr={1} pl={1}>
          <TextField
            key="remarks"
            id="remarks"
            name="remarks"
            label="備考"
            type="text"
            size="small"
            fullWidth
            multiline
            minRows={2}
            maxRows={4}
            variant="outlined"
            value={newRemarks}
            onChange={(e) => updateRemarks(e.target.value)}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Stack gap={1} direction="row">
          <Button onClick={handleClose}>キャンセル</Button>
          <Button
            disabled={!enableSaveButton}
            variant="contained"
            onClick={() => {
              submitUpdatedApplications();
              handleClickSnacBar();
              handleClose();
            }}
          >
            完了
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateApplicationFormDialog;
