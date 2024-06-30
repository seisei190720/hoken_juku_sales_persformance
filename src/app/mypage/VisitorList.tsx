import { FC } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { applicationStatus, IndividualSalesResult } from "../types";
import Chip from "@mui/material/Chip";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";

type Props = {
  salesResults: IndividualSalesResult[];
};
const VisitorList: FC<Props> = ({ salesResults }) => {
  const statusChipElm = (status: applicationStatus) => {
    switch (status) {
      case "成立":
        return <Chip label={status} color="success" />;
      case "不成立":
        return <Chip label={status} color="warning" />;
      case "未成立":
        return <Chip label={status} color="info" />;
      case null:
        return <Button>申込情報を登録する＞</Button>;
    }
  };
  return (
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
            <TableCell>申込状態</TableCell>
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
              <TableCell>{statusChipElm(row.status)}</TableCell>
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
  );
};

export default VisitorList;
