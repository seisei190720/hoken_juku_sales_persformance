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
import { styled } from "@mui/material/styles";
import { YearlyBudgetAndAchievementType } from "../hooks/useYearlyConstractComposition";

type Props = {
  title: string;
  values: YearlyBudgetAndAchievementType[] | undefined;
  columnHeaders: string[];
};

const YearlyBudgetAndAchievementSourceDataList: FC<Props> = ({
  title,
  values,
  columnHeaders,
}) => {
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
          <Table size="small" aria-label="a dense table" stickyHeader>
            <TableHead
              sx={{
                //なぜがstickyHeaderにすると効かない...
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
                <StyledTableRow key={`${idx}_row`}>
                  <TableCell key={`${idx}_month_${v.month}`}>
                    {v.month}
                  </TableCell>
                  <TableCell
                    key={`${idx}_achievement_${v.実実績}`}
                    align="right"
                  >
                    {v.実実績.toLocaleString()}
                  </TableCell>
                  <TableCell key={`${idx}_budget_${v.予算}`} align="right">
                    {v.予算.toLocaleString()}
                  </TableCell>
                  <TableCell key={`${idx}_percent_${v.達成率}`} align="right">
                    {`${v.達成率.toLocaleString()}%`}
                  </TableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </Card>
  );
};

export default YearlyBudgetAndAchievementSourceDataList;

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
