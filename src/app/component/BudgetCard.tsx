import Typography from "@mui/material/Typography";
import { blue } from "@mui/material/colors";
import React, { useEffect, useMemo, useState } from "react";
import { FC } from "react";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import { Button } from "@mui/material";
import BudgetEditorDialog from "./BudgetEditorDialog";
import { ContractBudget } from "../types";

type Props = {
  subValue: number | undefined;
  title: string;
  mainUnit: string;
  userId: string;
  targetMonth: string | null;
  targetYear: string | null;
  contractBudgetData: ContractBudget | undefined | null;
  postContractBudgetData: (newData: ContractBudget) => Promise<void>;
  canEdit: boolean;
};

const BudgetCard: FC<Props> = ({
  subValue,
  title,
  mainUnit,
  userId,
  targetMonth,
  targetYear,
  contractBudgetData,
  postContractBudgetData,
  canEdit,
}) => {
  const [openEditor, setOpenEditor] = useState(false);
  const handleEditClickOpen = () => {
    setOpenEditor(true);
  };
  const handleEditClose = () => {
    setOpenEditor(false);
  };

  const contentsPartEml = useMemo(() => {
    if (subValue === undefined || contractBudgetData === undefined)
      return <></>;
    if (contractBudgetData === null) {
      return (
        <Typography variant="h5" fontWeight={"Medium"}>
          予算未設定
        </Typography>
      );
    }
    return (
      <>
        <Stack
          direction="row"
          gap={1}
          alignItems="flex-end"
          justifyContent="center"
        >
          <Typography variant="h2" fontWeight={"Medium"}>
            {contractBudgetData.value.toLocaleString()}
          </Typography>
          <Typography variant="h6">{mainUnit}</Typography>
        </Stack>
        <Typography variant="h5" color="gray">
          {`達成率：${subValue}%`}
        </Typography>
      </>
    );
  }, [subValue, contractBudgetData]);

  if (subValue === undefined || contractBudgetData === undefined)
    return (
      <Card
        sx={{
          borderRadius: "12px",
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: 215,
        }}
      >
        <CircularProgress />
      </Card>
    );
  return (
    <Card sx={{ padding: 2, borderRadius: "12px", flex: 1 }}>
      <Stack height="100%">
        <Typography variant="h6" color={blue[600]}>
          {title}
        </Typography>
        <Stack
          direction="column"
          alignItems="center"
          justifyContent="center"
          flex={1}
        >
          {contentsPartEml}
        </Stack>
        {canEdit && (
          <Stack direction="row" justifyContent="flex-end">
            <Button size="small" onClick={handleEditClickOpen}>
              予算を編集する
            </Button>
          </Stack>
        )}
      </Stack>
      {openEditor && (
        <BudgetEditorDialog
          openFormDialog={openEditor}
          handleClose={handleEditClose}
          userId={userId}
          targetMonth={targetMonth}
          targetYear={targetYear}
          contractBudgetData={contractBudgetData}
          postContractBudgetData={postContractBudgetData}
        />
      )}
    </Card>
  );
};

export default BudgetCard;
