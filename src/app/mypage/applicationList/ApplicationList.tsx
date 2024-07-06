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
import { AuthUser } from "aws-amplify/auth";
import UpdateApplicationFormDialog from "./UpdateApplicationFormDialog";
import CircularProgress from "@mui/material/CircularProgress";

type Props = {
  user: AuthUser;
  productMst: ProductMst[];
  companyMst: CompanyMst[];
  statusMst: StatusMst[];
  salesResultData: IndividualSalesResult[] | undefined;
  updateApplicationsData: (newData: IndividualSalesResult) => Promise<void>;
};

const ApplicationList: FC<Props> = ({
  user,
  productMst,
  companyMst,
  statusMst,
  salesResultData,
  updateApplicationsData,
}) => {
  const [targetSalesResult, setTargetSalesResult] = useState<
    IndividualSalesResult | undefined
  >(undefined);

  const [openEditDailog, setOpenEditDailog] = useState(false);

  const handleClickOpen = () => {
    setOpenEditDailog(true);
  };

  const handleClose = () => {
    setOpenEditDailog(false);
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

  if (!salesResultData) return <CircularProgress />;
  return (
    <>
      <Stack gap={1}>
        {salesResultData
          .filter((v) => v.applications.length > 0)
          .map((result) => (
            <Accordion
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
                  backgroundColor: "#E6FFE9",
                }}
              >
                <Stack
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center"
                  gap={3}
                >
                  <Typography variant="subtitle1" color="#1976d2">
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
                    <TableRow>
                      <TableCell>申込日</TableCell>
                      <TableCell>会社</TableCell>
                      <TableCell>商品</TableCell>
                      <TableCell>成立日</TableCell>
                      <TableCell>初回手数料</TableCell>
                      <TableCell>状態</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {result.applications.map((app) => (
                      <TableRow hover key={result.name}>
                        <TableCell component="th" scope="row">
                          {app.applicationDate}
                        </TableCell>
                        <TableCell>{app.company}</TableCell>
                        <TableCell>{app.product}</TableCell>
                        <TableCell>
                          {app.status === "未成立" && app.establishDate === null
                            ? "-"
                            : app.establishDate}
                        </TableCell>
                        <TableCell>
                          {app.status === "未成立" && app.firstYearFee === null
                            ? "-"
                            : app.firstYearFee}
                        </TableCell>
                        <TableCell>{statusChip(app.status)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <Stack mt={1} direction="row" justifyContent="flex-end">
                  <Button
                    variant="outlined"
                    startIcon={<EditIcon />}
                    onClick={() => {
                      setTargetSalesResult(result);
                      handleClickOpen();
                    }}
                  >
                    編集
                  </Button>
                </Stack>
              </AccordionDetails>
            </Accordion>
          ))}
      </Stack>
      {openEditDailog && (
        <UpdateApplicationFormDialog
          salesResult={targetSalesResult}
          statusMst={statusMst}
          openFormDialog={openEditDailog}
          handleClose={handleClose}
          productMst={productMst}
          companyMst={companyMst}
          updateApplicationsData={updateApplicationsData}
        />
      )}
    </>
  );
};

export default ApplicationList;
