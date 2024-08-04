import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import { FC, useState } from "react";
import {
  CompanyMst,
  ConsultContentMst,
  IndividualSalesResult,
  NewVisitor,
  ProductMst,
  RouteMst,
} from "../../../types";
import VisitorFormDialog from "./VisitorFormDialog";
import VisitorList from "./VisitorList";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import SuccessSnacBar from "@/app/component/SuccessSnacBar";
import { useBoolean } from "@/app/hooks/util";

type Props = {
  userId: string;
  salesResultData: IndividualSalesResult[] | undefined;
  postVisitorData: (newData: NewVisitor) => Promise<void>;
  updateSalesResultData: (newData: IndividualSalesResult) => Promise<void>;
  deleteSalesResultData: (deleteTarget: IndividualSalesResult) => Promise<void>;
  routeMst: RouteMst[];
  productMst: ProductMst[];
  companyMst: CompanyMst[];
  consultContentMst: ConsultContentMst[];
  canEdit: boolean;
};

const Visitor: FC<Props> = ({
  userId,
  salesResultData,
  postVisitorData,
  updateSalesResultData,
  deleteSalesResultData,
  routeMst,
  productMst,
  companyMst,
  consultContentMst,
  canEdit,
}) => {
  const openFormDialog = useBoolean(false);

  const [openSnackBar, setOpenSnackBar] = useState(false);
  const handleClickSnacBar = () => {
    setOpenSnackBar(true);
  };

  if (!salesResultData) return <CircularProgress />;
  return (
    <>
      <Stack gap={2}>
        <Stack direction="row" gap={2} justifyContent="flex-end">
          {canEdit && (
            <Fab
              variant="extended"
              size="medium"
              color="primary"
              onClick={openFormDialog.handleTrue}
              sx={{ position: "fixed", bottom: 72, right: 56 }}
            >
              <AddIcon sx={{ mr: 1 }} />
              新規追加
            </Fab>
          )}
        </Stack>
        <VisitorList
          salesResults={salesResultData || []}
          productMst={productMst}
          companyMst={companyMst}
          routeMst={routeMst}
          consultContentMst={consultContentMst}
          updateSalesResultData={updateSalesResultData}
          deleteSalesResultData={deleteSalesResultData}
          canEdit={canEdit}
        />
      </Stack>
      {openFormDialog.bool && (
        <VisitorFormDialog
          openFormDialog={openFormDialog.bool}
          handleClose={openFormDialog.handleFalse}
          routeMst={routeMst}
          consultContentMst={consultContentMst}
          postVisitorData={postVisitorData}
          handleClickSnacBar={handleClickSnacBar}
        />
      )}
      <SuccessSnacBar
        openSnackBar={openSnackBar}
        setOpenSnackBar={setOpenSnackBar}
        message={"保存が完了しました。"}
      />
    </>
  );
};

export default Visitor;
