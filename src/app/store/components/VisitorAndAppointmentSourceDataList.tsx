import { FC } from "react";
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
import { VisitorAndAppointmentType } from "../hooks/useStoreAchievementData";

type Props = {
  title: string;
  values: VisitorAndAppointmentType[] | undefined;
};

const VisitorAndAppointmentSourceDataList: FC<Props> = ({ title, values }) => {
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
                <TableCell key={"emptyRowCell"}></TableCell>
                <TableCell colSpan={2} key={"visitorCountRowCell"}>
                  来店者数(人)
                </TableCell>
                <TableCell colSpan={2} key={"nextAppointmentRowCell"}>
                  次アポ(件/%)
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell key={"nameRowCell"}>名前</TableCell>
                <TableCell key={"newVisitorRowCell"}>新規</TableCell>
                <TableCell key={"existVisitorRowCell"}>既契約</TableCell>
                <TableCell key={"appointmentCountRowCell"}>数</TableCell>
                <TableCell key={"appointmentPercentRowCell"}>率</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {values.map((v, idx) => (
                <TableRow key={`${idx}_row`}>
                  <TableCell
                    component="th"
                    scope="row"
                    key={`${idx}_name_${v.name}`}
                  >
                    {v.name}
                  </TableCell>
                  <TableCell key={`${idx}_newCount_${v.新規数}`}>
                    {v.新規数}
                  </TableCell>
                  <TableCell key={`${idx}_existCount_${v.既契約数}`}>
                    {v.既契約数}
                  </TableCell>
                  <TableCell key={`${idx}_appointmentCount_${v.次アポ取得数}`}>
                    {v.次アポ取得数}
                  </TableCell>
                  <TableCell
                    key={`${idx}_appointmentPercent_${v.nextAppointMentPercent}`}
                  >
                    {v.nextAppointMentPercent}
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

export default VisitorAndAppointmentSourceDataList;
