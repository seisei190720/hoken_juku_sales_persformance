import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { FC, useState } from "react";
import {
  ConsultContentMst,
  IndividualSalesResult,
  NewVisitor,
  RouteMst,
} from "../../types";
import VisitorFormDialog from "./VisitorFormDialog";

type Props = {
  salesResultData: IndividualSalesResult[];
  postVisitorData: (newData: NewVisitor) => Promise<void>;
  routeMst: RouteMst[];
  consultContentMst: ConsultContentMst[];
};

const HeaderArea: FC<Props> = ({
  salesResultData,
  postVisitorData,
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
          <Button variant="contained" onClick={handleClickOpen}>
            来店記録を追加する
          </Button>
        </Stack>
      </Stack>
      <VisitorFormDialog
        openFormDialog={openFormDialog}
        handleClose={handleClose}
        routeMst={routeMst}
        consultContentMst={consultContentMst}
        postVisitorData={postVisitorData}
      />
    </>
  );
};

export default HeaderArea;
