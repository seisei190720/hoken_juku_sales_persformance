import {
  CompanyMst,
  IndividualSalesResult,
  ProductMst,
  StatusMst,
} from "@/app/types";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Stack from "@mui/material/Stack";
import { FC, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import UpdateApplicationFormDialog from "./UpdateApplicationFormDialog";
import CircularProgress from "@mui/material/CircularProgress";
import { green, grey, orange, red } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import DeleteApplicationDialog from "../../component/DeleteApplicationDialog";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

type Props = {
  productMst: ProductMst[];
  companyMst: CompanyMst[];
  statusMst: StatusMst[];
  salesResultData: IndividualSalesResult[] | undefined;
  updateApplicationsData: (newData: IndividualSalesResult) => Promise<void>;
  canEdit: boolean;
};

const ApplicationList: FC<Props> = ({
  productMst,
  companyMst,
  statusMst,
  salesResultData,
  updateApplicationsData,
  canEdit,
}) => {
  const [targetSalesResult, setTargetSalesResult] = useState<
    IndividualSalesResult | undefined
  >(undefined);

  const [openEditDailog, setOpenEditDailog] = useState(false);
  const handleEditClickOpen = () => {
    setOpenEditDailog(true);
  };
  const handleEditClose = () => {
    setOpenEditDailog(false);
  };

  const [openDeleteDailog, setOpenDeleteDailog] = useState(false);
  const handleDeleteClickOpen = () => {
    setOpenDeleteDailog(true);
  };
  const handleDeleteClose = () => {
    setOpenDeleteDailog(false);
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

  const existsInProgressConstract = (target: IndividualSalesResult) => {
    return target.applications.some((v) => v.status === "未成立");
  };

  const statusChip = (status: string) => {
    switch (status) {
      case "未成立":
        return <Chip label={status} color="warning" />;
      case "成立":
        return <Chip label={status} color="success" />;
      case "不成立":
        return <Chip label={status} color="default" />;
      case null:
        return <></>;
    }
  };

  const getAccordionHeaderColor = (
    thankyou: boolean,
    showInProgressApp: boolean
  ) => {
    if (thankyou) return red[200];
    return showInProgressApp ? orange[100] : green[100];
  };

  if (!salesResultData) return <CircularProgress />;
  return (
    <>
      <Stack gap={1}>
        {salesResultData
          .filter((v) => v.applications.length > 0)
          .map((result, idx) => (
            <Accordion
              key={`accordion_${idx}`}
              defaultExpanded
              sx={{
                borderRadius: "12px",
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`accordion_${result.name}`}
                id={`accordion_${result.name}`}
                sx={{
                  height: "64px",
                  borderRadius: "12px ",
                  backgroundColor: getAccordionHeaderColor(
                    result.thankyou,
                    existsInProgressConstract(result)
                  ),
                }}
              >
                <Stack
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center"
                  gap={3}
                >
                  <Typography variant="subtitle1" fontWeight="bold">
                    {result.name}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{ color: "text.secondary" }}
                  >
                    {`申込数：${result.applications.length}件`}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{ color: "text.secondary" }}
                  >
                    {`ありがとう：${result.thankyou ? "完了済み" : "未完了"}`}
                  </Typography>
                </Stack>
              </AccordionSummary>
              <AccordionDetails>
                <Table size="small">
                  <TableHead>
                    <TableRow key={"applicator_header"}>
                      <TableCell>申込日</TableCell>
                      <TableCell>会社</TableCell>
                      <TableCell>商品</TableCell>
                      <TableCell>状態</TableCell>
                      <TableCell>成立日</TableCell>
                      <TableCell>初回手数料</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {result.applications.map((app, idx) => (
                      <StyledTableRow hover key={`${result.name}_${idx}`}>
                        <TableCell component="th" scope="row">
                          {app.applicationDate}
                        </TableCell>
                        <TableCell>{app.company}</TableCell>
                        <TableCell>{app.product}</TableCell>
                        <TableCell>{statusChip(app.status)}</TableCell>
                        <TableCell>
                          {app.establishDate === null ? "-" : app.establishDate}
                        </TableCell>
                        <TableCell>
                          {app.firstYearFee === null ? "-" : app.firstYearFee}
                        </TableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
                {canEdit && (
                  <Stack
                    mt={1}
                    gap={1}
                    direction="row"
                    justifyContent="flex-end"
                  >
                    <Button
                      variant="outlined"
                      startIcon={<EditIcon />}
                      onClick={() => {
                        setTargetSalesResult(result);
                        handleEditClickOpen();
                      }}
                    >
                      編集
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<DeleteIcon />}
                      onClick={() => {
                        setTargetSalesResult(result);
                        handleDeleteClickOpen();
                      }}
                    >
                      削除
                    </Button>
                  </Stack>
                )}
              </AccordionDetails>
            </Accordion>
          ))}
      </Stack>
      {openEditDailog && (
        <UpdateApplicationFormDialog
          salesResult={targetSalesResult}
          statusMst={statusMst}
          openFormDialog={openEditDailog}
          handleClose={handleEditClose}
          productMst={productMst}
          companyMst={companyMst}
          updateApplicationsData={updateApplicationsData}
        />
      )}
      {openDeleteDailog && (
        <DeleteApplicationDialog
          salesResult={targetSalesResult}
          openDialog={openDeleteDailog}
          titleDeleteTarget={"申込情報"}
          dialogMessage="削除した申込情報は元に戻すことはできません。本当によろしいですか？"
          handleClose={handleDeleteClose}
          updateApplicationsData={updateApplicationsData}
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

export default ApplicationList;

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: grey[50],
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
