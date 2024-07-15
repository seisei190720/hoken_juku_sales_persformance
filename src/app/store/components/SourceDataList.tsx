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
import { CountAndPercentType } from "../hooks/useStoreAchievementData";

type Props = {
  title: string;
  values: CountAndPercentType[] | undefined;
  columnHeaders: string[];
};

const SourceDataList: FC<Props> = ({ title, values, columnHeaders }) => {
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
                {columnHeaders.map((v, idx) => (
                  <TableCell key={`${idx}_${v}`}>{v}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {values.map((v, idx) => (
                <TableRow key={`${idx}_row`}>
                  <TableCell key={`${idx}_name_${v.name}`}>{v.name}</TableCell>
                  <TableCell key={`${idx}_count_${v.件数}`} align="right">
                    {v.件数}
                  </TableCell>
                  <TableCell key={`${idx}_all_${v.全体}`} align="right">
                    {v.全体}
                  </TableCell>
                  <TableCell key={`${idx}_percent_${v.率}`} align="right">
                    {`${v.率}%`}
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

export default SourceDataList;
