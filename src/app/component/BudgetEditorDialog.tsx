import { FC, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { ContractBudget } from "../types";
import { useUpdateContractBudget } from "../hooks/useUpdateContractBudget";

type Props = {
  openFormDialog: boolean;
  handleClose: () => void;
  userId: string;
  targetMonth: string | null;
  targetYear: string | null;
  contractBudgetData: ContractBudget | null;
  postContractBudgetData: (newData: ContractBudget) => Promise<void>;
};

const BudgetEditorDialog: FC<Props> = ({
  openFormDialog,
  handleClose,
  userId,
  targetMonth,
  targetYear,
  contractBudgetData,
  postContractBudgetData,
}) => {
  const budget = useUpdateContractBudget(
    userId,
    targetMonth,
    targetYear,
    contractBudgetData,
    postContractBudgetData
  );

  //   if (!salesResult) return <></>;
  return (
    <Dialog
      open={openFormDialog}
      onClose={handleClose}
      fullWidth
      maxWidth="xs"
      PaperProps={{
        component: "form",
      }}
    >
      <DialogTitle>責任挙績の更新</DialogTitle>
      <DialogContent>
        <Stack ml={1} gap={3} direction="column">
          {/* <DialogContentText>責任挙績を更新してください。</DialogContentText> */}
          <TextField
            required={false}
            key={"budget_sum"}
            id={"budget_sum"}
            name={"budget_sum"}
            label={"責任挙績(円)"}
            value={budget.updatedBudget || ""}
            onChange={(e) =>
              budget.updateContractBudgetDate(Number(e.target.value))
            }
            type="number"
            variant="standard"
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Stack gap={1} direction="row">
          <Button onClick={handleClose}>キャンセル</Button>
          <Button
            variant="contained"
            onClick={() => {
              budget.submitUpdatedBudget();
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

export default BudgetEditorDialog;
