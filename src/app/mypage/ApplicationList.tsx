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
import UpdateApplicationFormDialog from "./monthly/applicators/UpdateApplicationFormDialog";
import CircularProgress from "@mui/material/CircularProgress";
import { green, grey, orange, red } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import DeleteApplicationDialog from "../component/DeleteApplicationDialog";
import Box from "@mui/material/Box";
import SuccessSnacBar from "@/app/component/SuccessSnacBar";
import { useBoolean } from "@/app/hooks/util";
import EmptyState from "../component/EmptyState";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

type Props = {
  salesResultData: IndividualSalesResult[] | undefined;
  updateApplicationsData: (newData: IndividualSalesResult) => Promise<void>;
  productMst: ProductMst[];
  companyMst: CompanyMst[];
  statusMst: StatusMst[];
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

  const openEditDailog = useBoolean(false);
  const openDeleteDailog = useBoolean(false);

  const [openSnackBar, setOpenSnackBar] = useState(false);
  const handleClickSnacBar = () => {
    setOpenSnackBar(true);
  };

  const existsInProgressConstract = (target: IndividualSalesResult) => {
    return target.applications.some((v) => v.status === "1");
  };

  const statusChip = (status: string) => {
    switch (status) {
      case "1": //未成立
        return (
          <Chip
            label={
              statusMst.find((s) => s.id === status)?.name ||
              "存在しないマスタです"
            }
            color="warning"
          />
        );
      case "2": //成立
        return (
          <Chip
            label={
              statusMst.find((s) => s.id === status)?.name ||
              "存在しないマスタです"
            }
            color="success"
          />
        );
      case "3": //不成立
        return (
          <Chip
            label={
              statusMst.find((s) => s.id === status)?.name ||
              "存在しないマスタです"
            }
            color="default"
          />
        );
      case null:
        return <></>;
    }
  };

  if (!salesResultData) return <CircularProgress />;
  if (salesResultData.filter((v) => v.applications.length > 0).length < 1)
    return (
      <Box pt={2}>
        <EmptyState
          message={"申込情報が存在しません"}
          subMessage={
            canEdit
              ? "来店者一覧の「新規申込」から申込情報を追加してください。"
              : ""
          }
        />
      </Box>
    );
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
                  backgroundColor: existsInProgressConstract(result)
                    ? orange[100]
                    : green[100],
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
                  <Stack direction="row" gap={0.5}>
                    <Typography
                      variant="subtitle2"
                      sx={{ color: "text.secondary" }}
                    >
                      {`ありがとう：${result.thankyou ? "完了済み" : "未完了"}`}
                    </Typography>
                    {result.thankyou ? (
                      <FavoriteIcon color="error" />
                    ) : (
                      <FavoriteBorderIcon color="disabled" />
                    )}
                  </Stack>
                </Stack>
              </AccordionSummary>
              <AccordionDetails>
                <Stack gap={1}>
                  <Table size="small">
                    <TableHead>
                      <TableRow
                        key={"applicator_header"}
                        sx={{ display: "flex" }}
                      >
                        <TableCell sx={{ flex: 1 }}>申込日</TableCell>
                        <TableCell sx={{ flex: 1 }}>会社</TableCell>
                        <TableCell sx={{ flex: 1 }}>商品</TableCell>
                        <TableCell sx={{ flex: 1 }}>初回手数料</TableCell>
                        <TableCell sx={{ flex: 1 }}>保険料</TableCell>
                        <TableCell sx={{ flex: 1 }}>状態</TableCell>
                        <TableCell sx={{ flex: 1 }}>成立日</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {result.applications.map((app, idx) => (
                        <StyledTableRow
                          hover
                          key={`${result.name}_${idx}`}
                          sx={{ display: "flex" }}
                        >
                          <TableCell
                            component="th"
                            scope="row"
                            sx={{ flex: 1 }}
                          >
                            {app.applicationDate}
                          </TableCell>
                          <TableCell sx={{ flex: 1 }}>
                            {companyMst.find((c) => c.id === app.company)
                              ?.name || "マスタが見つかりません"}
                          </TableCell>
                          <TableCell sx={{ flex: 1 }}>
                            {productMst.find((c) => c.id === app.product)
                              ?.name || "マスタが見つかりません"}
                          </TableCell>
                          <TableCell sx={{ flex: 1 }}>
                            {app.firstYearFee === null
                              ? "-"
                              : app.firstYearFee.toLocaleString()}
                          </TableCell>
                          <TableCell sx={{ flex: 1 }}>
                            {app.insuranceFee === null
                              ? "-"
                              : app.insuranceFee.toLocaleString()}
                          </TableCell>
                          <TableCell sx={{ flex: 1 }}>
                            {statusChip(app.status)}
                          </TableCell>
                          <TableCell sx={{ flex: 1 }}>
                            {app.establishDate === null
                              ? "-"
                              : app.establishDate}
                          </TableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
                  {result.remarks !== null && (
                    <Stack direction="column" pr={1} pl={1}>
                      <Typography
                        pl={1}
                        variant="subtitle2"
                        color="rgba(0, 0, 0, 0.87)"
                      >
                        備考
                      </Typography>
                      <Box
                        sx={{
                          whiteSpace: "pre-wrap",
                          padding: "8px",
                          color: "rgba(0, 0, 0, 0.87)",
                          border: "1px solid rgba(224, 224, 224, 1)",
                          borderRadius: "4px",
                        }}
                      >
                        {result.remarks}
                      </Box>
                    </Stack>
                  )}
                  {canEdit && (
                    <Stack
                      gap={1}
                      pr={1}
                      direction="row"
                      justifyContent="flex-end"
                    >
                      <Button
                        variant="outlined"
                        startIcon={<EditIcon />}
                        onClick={() => {
                          setTargetSalesResult(result);
                          openEditDailog.handleTrue();
                        }}
                      >
                        編集
                      </Button>
                      <Button
                        variant="outlined"
                        startIcon={<DeleteIcon />}
                        onClick={() => {
                          setTargetSalesResult(result);
                          openDeleteDailog.handleTrue();
                        }}
                      >
                        削除
                      </Button>
                    </Stack>
                  )}
                </Stack>
              </AccordionDetails>
            </Accordion>
          ))}
      </Stack>
      {openEditDailog.bool && (
        <UpdateApplicationFormDialog
          salesResult={targetSalesResult}
          statusMst={statusMst}
          openFormDialog={openEditDailog.bool}
          handleClose={openEditDailog.handleFalse}
          productMst={productMst}
          companyMst={companyMst}
          updateApplicationsData={updateApplicationsData}
          handleClickSnacBar={handleClickSnacBar}
        />
      )}
      {openDeleteDailog.bool && (
        <DeleteApplicationDialog
          salesResult={targetSalesResult}
          openDialog={openDeleteDailog.bool}
          titleDeleteTarget={"申込情報"}
          dialogMessage="削除した申込情報は元に戻すことはできません。本当によろしいですか？"
          handleClose={openDeleteDailog.handleFalse}
          updateApplicationsData={updateApplicationsData}
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
