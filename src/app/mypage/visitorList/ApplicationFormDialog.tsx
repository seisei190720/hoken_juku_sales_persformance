import { IconButton, Typography } from "@mui/material";
import { FC } from "react";
import { CompanyMst, IndividualSalesResult, ProductMst } from "../../types";
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
import { useNewApplications } from "./hooks/useNewApplications";

type Props = {
  openFormDialog: boolean;
  handleClose: () => void;
  salesResult: IndividualSalesResult | undefined;
  productMst: ProductMst[];
  companyMst: CompanyMst[];
  updateApplicationsData: (newData: IndividualSalesResult) => Promise<void>;
};

const ApplicationFormDialog: FC<Props> = ({
  openFormDialog,
  handleClose,
  salesResult,
  productMst,
  companyMst,
  updateApplicationsData,
}) => {
  const {
    newApplications,
    updateApplicationDate,
    updateProduct,
    updateCompany,
    addProduct,
    deleteProduct,
    submitNewApplications,
  } = useNewApplications(
    salesResult,
    productMst,
    companyMst,
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
          <DialogContentText>
            申込情報を入力してください。登録後にも内容を編集できます。
          </DialogContentText>
          {newApplications.map((app, idx) => {
            return (
              <Stack gap={3} direction="row" alignItems="flex-end">
                <Typography variant="h6">{`${idx}.`}</Typography>
                <TextField
                  // autoFocus
                  required
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
                      <MenuItem value={r.id}>{r.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl required variant="standard" fullWidth>
                  <InputLabel>商品</InputLabel>
                  <Select
                    labelId={`${idx}_product`}
                    id={`${idx}_product`}
                    value={app.product?.id}
                    label="商品"
                    onChange={(e) => updateProduct(e, idx)}
                  >
                    {productMst.map((r) => (
                      <MenuItem value={r.id}>{r.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {newApplications.length > 1 && (
                  <IconButton onClick={() => deleteProduct(idx)}>
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
              onClick={addProduct}
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
              submitNewApplications();
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

export default ApplicationFormDialog;
