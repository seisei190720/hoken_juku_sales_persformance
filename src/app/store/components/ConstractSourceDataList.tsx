import { FC, useEffect } from "react";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import { blue, grey } from "@mui/material/colors";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { ConstractSouceType } from "../hooks/useStoreConstractData";

type Props = {
  title: string;
  values: ConstractSouceType[] | undefined;
};

const ConstractSourceDataList: FC<Props> = ({ title, values }) => {
  if (!values)
    return (
      <Card
        sx={{
          padding: 2,
          borderRadius: "12px",
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: 400,
        }}
      >
        <CircularProgress />
      </Card>
    );
  return (
    <Card
      sx={{
        borderRadius: "12px",
        padding: 1,
        paddingTop: 2,
        flex: 1,
        height: 400,
      }}
    >
      <Stack
        gap={2}
        height={350}
        sx={{
          overflow: "auto",
        }}
      >
        <Typography variant="h6" color={blue[600]}>
          {title}
        </Typography>
        <TableContainer>
          <Table size="small" aria-label="a dense table">
            <TableHead
              sx={{
                background: blue[100],
              }}
            >
              <TableRow>
                <TableCell key={"name"}>名前</TableCell>
                <TableCell key={"sum"} align="right">
                  実績(円)
                </TableCell>
                <TableCell key={"inProgressAppCount"} align="right">
                  申込残り(件)
                </TableCell>
                <TableCell key={"inProgressAppSum"} align="right">
                  申込残り(円)
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {values.map((v, idx) => (
                <TableRow key={`${idx}_row`}>
                  <TableCell key={`${idx}_name_${v.name}`}>{v.name}</TableCell>
                  <TableCell key={`${idx}_constractSum_${v.sum}`} align="right">
                    {v.sum.toLocaleString()}
                  </TableCell>
                  <TableCell
                    key={`${idx}_appCount_${v.inProgressAppCount}`}
                    align="right"
                  >
                    {v.inProgressAppCount}
                  </TableCell>
                  <TableCell
                    key={`${idx}_appSum_${v.inProgressAppSum}`}
                    align="right"
                  >
                    {v.inProgressAppSum.toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </Card>
  );
};

export default ConstractSourceDataList;
