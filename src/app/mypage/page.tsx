import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import CommentIcon from '@mui/icons-material/Comment';
import IconButton from '@mui/material/IconButton';
import React from "react";
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import TablePagination from '@mui/material/TablePagination';
import TableFooter from '@mui/material/TableFooter';

type IndividualSalesResult = {
    visitDay: string,
    customerKind: string,
    customerName: string,
    consultContents: string,
    nextAppointment: boolean,
    contractCount: number,
    contractProduct: string,
    thankyou: boolean
};

const Mypage = () => {
    const salesResult: IndividualSalesResult[] = [{
        visitDay: "2024/06/01",
        customerKind: "新規",
        customerName: "山田太郎",
        consultContents: "生命保険",
        nextAppointment: true,
        contractCount: 1,
        contractProduct: "傷害保険",
        thankyou: true,
    }, {
        visitDay: "2024/06/02",
        customerKind: "既契約",
        customerName: "鈴木一朗",
        consultContents: "生命保険",
        nextAppointment: false,
        contractCount: 0,
        contractProduct: "",
        thankyou: false,
    }, {
        visitDay: "2024/06/02",
        customerKind: "既契約",
        customerName: "鈴木一朗",
        consultContents: "生命保険",
        nextAppointment: false,
        contractCount: 0,
        contractProduct: "",
        thankyou: false,
    }, {
        visitDay: "2024/06/02",
        customerKind: "既契約",
        customerName: "鈴木一朗",
        consultContents: "生命保険",
        nextAppointment: false,
        contractCount: 0,
        contractProduct: "",
        thankyou: false,
    }, {
        visitDay: "2024/06/02",
        customerKind: "既契約",
        customerName: "鈴木一朗",
        consultContents: "生命保険",
        nextAppointment: false,
        contractCount: 0,
        contractProduct: "",
        thankyou: false,
    }]
    return (
        <>
            <Stack gap={2}>
                <Typography variant='h4'>あなたの営業成績</Typography>
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
                                    <TableCell component="th" scope="row">{row.visitDay}</TableCell>
                                    <TableCell >{row.customerKind}</TableCell>
                                    <TableCell >{row.customerName}</TableCell>
                                    <TableCell >{row.consultContents}</TableCell>
                                    <TableCell >{row.nextAppointment ? "◯" : "-"}</TableCell>
                                    <TableCell >{row.contractCount}</TableCell>
                                    <TableCell >{row.contractProduct}</TableCell>
                                    <TableCell >{row.thankyou ? "◯" : "-"}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Stack>
        </>
    );
};

export default Mypage;
