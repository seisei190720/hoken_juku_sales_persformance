import { FC, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
  CompanyMst,
  ConsultContentMst,
  IndividualSalesResult,
  ProductMst,
  RouteMst,
} from "../../types";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import ApplicationFormDialog from "./ApplicationFormDialog";
import { blue, grey } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import DeleteApplicationDialog from "@/app/component/DeleteApplicationDialog";
import CircularProgress from "@mui/material/CircularProgress";
import UpdateVisitorFormDialog from "./UpdateVisitorFormDialog";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

type Props = {
  salesResults: IndividualSalesResult[];
  productMst: ProductMst[];
  companyMst: CompanyMst[];
  routeMst: RouteMst[];
  consultContentMst: ConsultContentMst[];
  updateSalesResultData: (newData: IndividualSalesResult) => Promise<void>;
  deleteSalesResultData: (deleteTarget: IndividualSalesResult) => Promise<void>;
};
const VisitorList: FC<Props> = ({
  salesResults,
  productMst,
  companyMst,
  routeMst,
  consultContentMst,
  updateSalesResultData,
  deleteSalesResultData,
}) => {
  const [selectedSalesResult, setSelectedSalesResult] = useState<
    IndividualSalesResult | undefined
  >(undefined);

  const [openFormDialog, setOpenFormDialog] = useState(false);
  const handleFormClickOpen = () => {
    setOpenFormDialog(true);
  };
  const handleFormClose = () => {
    setOpenFormDialog(false);
  };

  const [openUpdateFormDialog, setOpenUpdateFormDialog] = useState(false);
  const handleUpdateFormClickOpen = () => {
    setOpenUpdateFormDialog(true);
  };
  const handleUpdateFormClose = () => {
    setOpenUpdateFormDialog(false);
  };

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const handleDeleteClickOpen = () => {
    setOpenDeleteDialog(true);
  };
  const handleDeleteClose = () => {
    setOpenDeleteDialog(false);
  };

  const [openSnackBar, setOpenSnackBar] = useState(false);
  const handleClickSnacBar = () => {
    setOpenSnackBar(true);
  };
  const handleCloseSnacBar = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackBar(false);
  };

  if (!selectedSalesResult) <CircularProgress />;
  return (
    <>
      <TableContainer component={Paper} style={{ marginBottom: 30 }}>
        {/* componentにライブラリのPaperをつけることで立体感がでてよくなります */}
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: blue[100] }}>
              <TableCell>来店日</TableCell>
              <TableCell>お名前</TableCell>
              <TableCell>経路</TableCell>
              <TableCell>相談内容</TableCell>
              <TableCell>次アポ</TableCell>
              <TableCell>申込件数</TableCell>
              <TableCell sx={{ width: 70 }}>編集</TableCell>
              <TableCell sx={{ width: 70 }}>削除</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {salesResults.map((row) => (
              //ページ切り替えの要素を取得
              <StyledTableRow hover key={`${row.firstVisitDate}_${row.name}`}>
                {/* hoverを入れることでマウスポイントが表の上に乗った時に色が変わるアクションがつきます */}
                <TableCell component="th" scope="row">
                  {row.firstVisitDate}
                </TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.visitRoute}</TableCell>
                <TableCell>{row.consultContent}</TableCell>
                <TableCell>{row.nextAppointment ? "◯" : "-"}</TableCell>
                <TableCell>
                  {row.applications.length === 0 ? (
                    <Button
                      variant="outlined"
                      onClick={() => {
                        setSelectedSalesResult(row);
                        handleFormClickOpen();
                      }}
                    >
                      新規申込
                    </Button>
                  ) : (
                    `${row.applications.length}件`
                  )}
                </TableCell>
                {/* FIXME: 最悪menuアイコンにしてアンカーで「編集・削除」を選択できるようにする  */}
                <TableCell>
                  <IconButton>
                    <EditIcon
                      onClick={() => {
                        setSelectedSalesResult(row);
                        handleUpdateFormClickOpen();
                      }}
                    />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => {
                      setSelectedSalesResult(row);
                      handleDeleteClickOpen();
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {openFormDialog && (
        <ApplicationFormDialog
          openFormDialog={openFormDialog}
          handleClose={handleFormClose}
          salesResult={selectedSalesResult}
          productMst={productMst}
          companyMst={companyMst}
          updateApplicationsData={updateSalesResultData}
          handleClickSnacBar={handleClickSnacBar}
        />
      )}
      {openUpdateFormDialog && (
        <UpdateVisitorFormDialog
          openFormDialog={openUpdateFormDialog}
          handleClose={handleUpdateFormClose}
          salesResult={selectedSalesResult}
          routeMst={routeMst}
          consultContentMst={consultContentMst}
          updateSalesResultData={updateSalesResultData}
          handleClickSnacBar={handleClickSnacBar}
        />
      )}
      {openDeleteDialog && (
        <DeleteApplicationDialog
          openDialog={openDeleteDialog}
          handleClose={handleDeleteClose}
          titleDeleteTarget={"来店記録"}
          dialogMessage={`${selectedSalesResult?.name}さんに紐づく情報(申込情報も含む)は全て削除されます。削除後は元に戻すことができません。本当によろしいですか？`}
          salesResult={selectedSalesResult}
          updateApplicationsData={deleteSalesResultData}
          handleClickSnacBar={handleClickSnacBar}
        />
      )}
      <Snackbar
        open={openSnackBar}
        autoHideDuration={6000}
        onClose={handleCloseSnacBar}
      >
        <Alert
          onClose={handleCloseSnacBar}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          保存が完了しました
        </Alert>
      </Snackbar>
    </>
  );
};

export default VisitorList;

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: grey[50],
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
