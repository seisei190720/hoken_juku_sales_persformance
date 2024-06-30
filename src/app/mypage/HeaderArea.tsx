import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { FC, useState } from "react";
import { ConsultContentMst, IndividualSalesResult, RouteMst } from "../types";
import FormDialog from "./FormDialog";

type Props = {
  salesResults: IndividualSalesResult[];
  routeMst: RouteMst[];
  consultContentMst: ConsultContentMst[];
};

const HeaderArea: FC<Props> = ({
  salesResults,
  routeMst,
  consultContentMst,
}) => {
  const [openFormDialog, setOpenFormDialog] = useState(false);
  const handleClickOpen = () => {
    setOpenFormDialog(true);
  };

  const handleClose = () => {
    setOpenFormDialog(false);
  };
  return (
    <>
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <Stack direction="row" spacing={2} alignItems="center">
          <Button>＜</Button>
          <Typography>2024-06</Typography>
          <Button>＞</Button>
        </Stack>
        <Stack direction="row" spacing={2}>
          <Button variant="outlined">レポートを確認する</Button>
          <Button variant="outlined" onClick={handleClickOpen}>
            来店記録を追加する
          </Button>
        </Stack>
      </Stack>
      <FormDialog
        openFormDialog={openFormDialog}
        handleClose={handleClose}
        routeMst={routeMst}
        consultContentMst={consultContentMst}
      />
    </>
  );
};

export default HeaderArea;
