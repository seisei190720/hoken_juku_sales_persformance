import { IconButton, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import {
  CompanyMst,
  IndividualSalesResult,
  ProductMst,
  StatusMst,
} from "../../types";
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
type Props = {
  openFormDialog: boolean;
  handleClose: () => void;
  salesResult: IndividualSalesResult | undefined;
  productMst: ProductMst[];
  companyMst: CompanyMst[];
  statusMst: StatusMst[];
  updateApplicationsData: (newData: IndividualSalesResult) => Promise<void>;
};

const UpdateApplicationFormDialog: FC<Props> = ({
  openFormDialog,
  handleClose,
  salesResult,
  productMst,
  companyMst,
  statusMst,
  updateApplicationsData,
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
    updateEstablishDate,
    submitUpdatedApplications,
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
        <Stack gap={3} direction="column">
          <DialogContentText>申込情報を更新してください。</DialogContentText>
          {updatedApplications.map((app, idx) => {
            return (
              <Stack
                key={`updateApplications_${idx}`}
                gap={3}
                direction="row"
                alignItems="flex-end"
              >
                <Typography variant="h6">{`${idx}.`}</Typography>
                <TextField
                  // autoFocus
                  required
                  key={`${idx}_applicationDate`}
                  id={`${idx}_applicationDate`}
                  name={`${idx}_applicationDate`}
                  label="申込日"
                  value={app.applicationDate}
                  onChange={(e) => updateApplicationDate(e.target.value, idx)}
                  type="date"
                  fullWidth
                  variant="standard"
                />
                <FormControl required variant="standard" fullWidth>
                  <InputLabel>保険会社</InputLabel>
                  <Select
                    labelId={`${idx}_company`}
                    id={`${idx}_company`}
                    value={app.company?.id}
                    label="保険会社"
                    onChange={(e) => updateCompany(e, idx)}
                  >
                    {companyMst.map((r) => (
                      <MenuItem key={`company_${idx}`} value={r.id}>
                        {r.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl required variant="standard" fullWidth>
                  <InputLabel>商品</InputLabel>
                  <Select
                    key={`${idx}_product`}
                    labelId={`${idx}_product`}
                    id={`${idx}_product`}
                    value={app.product?.id}
                    label="商品"
                    onChange={(e) => updateProduct(e, idx)}
                  >
                    {productMst.map((r) => (
                      <MenuItem key={`product_${idx}`} value={r.id}>
                        {r.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl required variant="standard" fullWidth>
                  <InputLabel>状態</InputLabel>
                  <Select
                    key={`${idx}_status`}
                    labelId={`${idx}_status`}
                    id={`${idx}_status`}
                    value={app.status?.id}
                    label="状態"
                    onChange={(e) => updateStatus(e, idx)}
                  >
                    {statusMst.map((r) => (
                      <MenuItem key={`status_${idx}`} value={r.id}>
                        {r.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField
                  // autoFocus
                  required
                  key={`${idx}_firstYearFee`}
                  id={`${idx}_firstYearFee`}
                  name={`${idx}_firstYearFee`}
                  label="初回手数料"
                  value={app.firstYearFee}
                  onChange={(e) =>
                    updateFirstYearFee(Number(e.target.value), idx)
                  }
                  type="number"
                  fullWidth
                  variant="standard"
                />
                <TextField
                  // autoFocus
                  required
                  id={`${idx}_establishDate`}
                  name={`${idx}_establishDate`}
                  label="契約日"
                  value={app.establishDate}
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
          <Stack direction="row" justifyContent="flex-start">
            <Button
              variant="text"
              startIcon={<AddIcon />}
              onClick={addApplication}
              color="inherit"
            >
              追加
            </Button>
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Stack gap={1} direction="row">
          <Button onClick={handleClose}>キャンセル</Button>
          <Button
            variant="contained"
            onClick={() => {
              submitUpdatedApplications();
              handleClose();
              //申込者一覧画面に移動する(新しく登録した順になっているはずなので、今登録したものが一番上にくる)
            }}
          >
            新規登録
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateApplicationFormDialog;
