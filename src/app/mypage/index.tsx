import { AuthUser } from "@aws-amplify/auth/cognito";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { FC } from "react";
import { useMockData } from "../mocks";

type Props = {
  user: AuthUser;
};

const MyPage: FC<Props> = ({ user }) => {
  const { salesResult } = useMockData();
  return (
    <>
      <Stack gap={2} sx={{ width: "100%" }}>
        <Typography variant="h4">{user.username}さんの営業成績</Typography>
        <TableContainer component={Paper} style={{ marginBottom: 30 }}>
          {/* componentにライブラリのPaperをつけることで立体感がでてよくなります */}
          <Table>
            <TableHead>
              <TableRow style={{ backgroundColor: "#F2F2F2" }}>
                <TableCell>来店日</TableCell>
                <TableCell>種別</TableCell>
                <TableCell>お名前</TableCell>
                <TableCell>相談内容</TableCell>
                <TableCell>次アポ</TableCell>
                <TableCell>契約件数(件)</TableCell>
                <TableCell>契約商品</TableCell>
                <TableCell>ありがとう</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {salesResult.map((row) => (
                //ページ切り替えの要素を取得
                <TableRow hover key={row.customerName}>
                  {/* hoverを入れることでマウスポイントが表の上に乗った時に色が変わるアクションがつきます */}
                  <TableCell component="th" scope="row">
                    {row.visitDay}
                  </TableCell>
                  <TableCell>{row.customerKind}</TableCell>
                  <TableCell>{row.customerName}</TableCell>
                  <TableCell>{row.consultContents}</TableCell>
                  <TableCell>{row.nextAppointment ? "◯" : "-"}</TableCell>
                  <TableCell>{row.contractCount}</TableCell>
                  <TableCell>{row.contractProduct}</TableCell>
                  <TableCell>{row.thankyou ? "◯" : "-"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </>
  );
};

export default MyPage;
