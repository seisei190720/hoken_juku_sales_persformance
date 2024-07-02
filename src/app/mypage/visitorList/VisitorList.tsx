import { FC, useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
  NewApplication,
  CompanyMst,
  IndividualSalesResult,
  ProductMst,
} from "../../types";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import ApplicationFormDialog from "./ApplicationFormDialog";

type Props = {
  salesResults: IndividualSalesResult[];
  productMst: ProductMst[];
  companyMst: CompanyMst[];
  updateApplicationsData: (newData: IndividualSalesResult) => Promise<void>;
};
const VisitorList: FC<Props> = ({
  salesResults,
  productMst,
  companyMst,
  updateApplicationsData,
}) => {
  const [openFormDailog, setOpenFormDailog] = useState(false);
  const [selectedSalesResult, setSelectedSalesResult] = useState<
    IndividualSalesResult | undefined
  >(undefined);

  const handleClickOpen = () => {
    setOpenFormDailog(true);
  };

  const handleClose = () => {
    setOpenFormDailog(false);
  };
  return (
    <>
      <TableContainer component={Paper} style={{ marginBottom: 30 }}>
        {/* componentにライブラリのPaperをつけることで立体感がでてよくなります */}
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#F2F2F2" }}>
              <TableCell>来店日</TableCell>
              <TableCell>お名前</TableCell>
              <TableCell>経路</TableCell>
              <TableCell>相談内容</TableCell>
              <TableCell>次アポ</TableCell>
              <TableCell>申込件数</TableCell>
              <TableCell sx={{ width: 20 }}>編集</TableCell>
              <TableCell sx={{ width: 20 }}>削除</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {salesResults.map((row) => (
              //ページ切り替えの要素を取得
              <TableRow hover key={`${row.firstVisitDate}_${row.name}`}>
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
                        handleClickOpen();
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
                    <EditIcon />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <IconButton>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {openFormDailog && (
        <ApplicationFormDialog
          openFormDialog={openFormDailog}
          handleClose={handleClose}
          salesResult={selectedSalesResult}
          productMst={productMst}
          companyMst={companyMst}
          updateApplicationsData={updateApplicationsData}
        />
      )}
    </>
  );
};

export default VisitorList;
