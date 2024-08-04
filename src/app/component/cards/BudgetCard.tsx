import Typography from "@mui/material/Typography";
import { blue } from "@mui/material/colors";
import React, { useMemo, useState } from "react";
import { FC } from "react";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import { Button } from "@mui/material";
import BudgetEditorDialog from "../BudgetEditorDialog";
import { ContractBudget } from "../../types";
import SuccessSnacBar from "../SuccessSnacBar";
import { useBoolean } from "@/app/hooks/util";
import LoadingCard from "./LoadingCard";

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
  const openEditor = useBoolean(false);

  const [openSnackBar, setOpenSnackBar] = useState(false);
  const handleClickSnacBar = () => {
    setOpenSnackBar(true);
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
    return <LoadingCard height={215} flex={1} />;
  return (
    <>
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
              <Button size="small" onClick={openEditor.handleTrue}>
                予算を編集する
              </Button>
            </Stack>
          )}
        </Stack>
        {openEditor.bool && (
          <BudgetEditorDialog
            openFormDialog={openEditor.bool}
            handleClose={openEditor.handleFalse}
            userId={userId}
            targetMonth={targetMonth}
            targetYear={targetYear}
            contractBudgetData={contractBudgetData}
            postContractBudgetData={postContractBudgetData}
            handleClickSnacBar={handleClickSnacBar}
          />
        )}
      </Card>
      <SuccessSnacBar
        openSnackBar={openSnackBar}
        setOpenSnackBar={setOpenSnackBar}
        message={"保存が完了しました。"}
      />
    </>
  );
};

export default BudgetCard;
