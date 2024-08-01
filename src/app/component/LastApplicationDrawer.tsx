import { FC, useMemo } from "react";
import {
  Application,
  ContractBudget,
  IndividualSalesResult,
  Member,
  ProductMst,
} from "@/app/types";
import Stack from "@mui/material/Stack";
import SimpleSummaryCard from "../old/mypage/components/SimpleSummaryCard";
import Drawer from "@mui/material/Drawer";
import { useLastApplicationsComposition } from "../old/mypage/contract/hooks/useLastApplicationsComposition";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import blue from "@mui/material/colors/blue";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import { styled } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";

type Props = {
  open: boolean;
  handleDrawerClose: () => void;
  members: Member[];
};

const LastApplicationDrawer: FC<Props> = ({
  open,
  handleDrawerClose,
  members,
}) => {
  const lastApplicationData = useLastApplicationsComposition(
    // selecetedMember === "all" ? null : selecetedMember.id,
    members
  );
  const eml = useMemo(() => {
    if (
      !lastApplicationData.lastApplicationData ||
      !lastApplicationData.memberLastApplicationDate
    )
      return (
        <Drawer
          anchor="bottom"
          open={open}
          onClose={handleDrawerClose}
          PaperProps={{
            sx: { height: "300px" },
          }}
        >
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
        </Drawer>
      );
    return (
      <Stack direction="row" p={4} gap={4}>
        {/* <Stack height={236} flex={1}> */}
        <SimpleSummaryCard
          values={
            lastApplicationData.lastApplicationData !== undefined
              ? {
                  mainValue: lastApplicationData.lastApplicationData.count,
                  subValue: "",
                }
              : undefined
          }
          title={"申込件数"}
          mainUnit={"件"}
        />
        <SimpleSummaryCard
          values={
            lastApplicationData.lastApplicationData !== undefined
              ? {
                  mainValue: lastApplicationData.lastApplicationData.sum,
                  subValue: "",
                }
              : undefined
          }
          title={"申込残金"}
          mainUnit={"円"}
        />
        {/* </Stack> */}
        <Card
          sx={{
            borderRadius: "12px",
            padding: 1,
            paddingTop: 2,
            flex: 1.5,
            height: 236,
          }}
        >
          <Stack
            gap={2}
            height={212}
            sx={{
              overflow: "auto",
            }}
          >
            <Typography variant="h6" color={blue[600]}>
              {"メンバー別申込残"}
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
                    <TableCell key={"name_row_cell"}>名前</TableCell>
                    <TableCell key={"count_row_cell"} align="right">
                      件数
                    </TableCell>
                    <TableCell key={"sum_row_cell"} align="right">
                      金額
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {lastApplicationData.memberLastApplicationDate?.map(
                    (v, idx) => (
                      <StyledTableRow key={`${idx}_row`}>
                        <TableCell key={`${idx}_name_${v.name}`}>
                          {v.name}
                        </TableCell>
                        <TableCell
                          key={`${idx}_count_${v.count}`}
                          align="right"
                        >
                          {`${v.count}件`}
                        </TableCell>
                        <TableCell key={`${idx}_all_${v.sum}`} align="right">
                          {`${v.sum.toLocaleString()}円`}
                        </TableCell>
                      </StyledTableRow>
                    )
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Stack>
        </Card>
      </Stack>
    );
  }, [
    lastApplicationData.lastApplicationData,
    lastApplicationData.memberLastApplicationDate,
  ]);

  return (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={handleDrawerClose}
      PaperProps={{
        sx: { height: "300px" },
      }}
    >
      {eml}
    </Drawer>
  );
};

export default LastApplicationDrawer;

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
