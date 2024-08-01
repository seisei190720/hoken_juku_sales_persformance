import { AuthUser } from "@aws-amplify/auth/cognito";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import { FC, useEffect, useState } from "react";
import { useMockData } from "../../mocks";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Button from "@mui/material/Button";
import { useSalesResultApi } from "../../api/useSalesResultApi";
import { useApplicationApi } from "../../api/useApplicationApi";
import YearlyResults from "./YearlyResults";
import { Member } from "../../types";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Fab from "@mui/material/Fab";
import { useContractBudgetApi } from "../../api/useContractBudgetApi";
import LastApplicationDrawer from "../../component/LastApplicationDrawer";

type Props = {
  user: AuthUser;
};

const YearlyPage: FC<Props> = ({ user }) => {
  const {
    members,
    routeMst,
    consultContentMst,
    productMst,
    companyMst,
    statusMst,
  } = useMockData();
  const [selecetedMember, setSelectedMember] = useState<Member | "all">("all");
  const handleMemberSelector = (e: SelectChangeEvent) => {
    if (e.target.value === "all") return setSelectedMember("all");
    setSelectedMember(members.find((m) => e.target.value === m.id) || "all");
  };

  const [openLastApplicationDrawer, setOpenLastApplicationDrawer] =
    useState(false);
  const handleDrawerClickOpen = () => {
    setOpenLastApplicationDrawer(true);
  };
  const handleDrawerClose = () => {
    setOpenLastApplicationDrawer(false);
  };

  const [targetYear, setTargetYear] = useState<string | null>(null);
  const { salesResultData } = useSalesResultApi(
    selecetedMember === "all" ? null : selecetedMember.id,
    {
      status: null,
      year: targetYear,
      firstVisitDate: null,
    }
  );

  const { applicationData } = useApplicationApi({
    userId: selecetedMember === "all" ? null : selecetedMember.id,
    year: targetYear,
    establishDate: null,
  });

  const { contractBudgetData, postContractBudgetData } = useContractBudgetApi({
    userId: selecetedMember === "all" ? "1" : selecetedMember.id,
    year: targetYear,
    month: null,
  });

  const forwardToNextMonth = () => {
    setTargetYear((v) => dayjs(v).add(1, "year").format("YYYY"));
  };
  const backToLastMonth = () => {
    setTargetYear((v) => dayjs(v).subtract(1, "year").format("YYYY"));
  };
  const moveToCurrentMonth = () => {
    setTargetYear(dayjs().format("YYYY"));
  };

  useEffect(() => {
    setTargetYear(dayjs().format("YYYY"));
  }, [setTargetYear]);

  return (
    <>
      <Stack gap={1} sx={{ width: "100%" }}>
        <Stack direction="row" gap={1} alignItems="center">
          <FormControl size="small">
            <InputLabel id="showing-member-select-label">メンバー</InputLabel>
            <Select
              sx={{
                width: "150px",
              }}
              labelId="showing-member-select-label"
              id="showing-member-select"
              value={selecetedMember === "all" ? "all" : selecetedMember.id}
              label="Member"
              onChange={handleMemberSelector}
            >
              <MenuItem value={"all"} key={`all-member-menuitem`}>
                店舗全体
              </MenuItem>
              {members.map((member, idx) => {
                return (
                  <MenuItem value={member.id} key={`${idx}_${member.name}`}>
                    {member.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <Typography variant="subtitle1">を表示中</Typography>
          {/* </Stack> */}
        </Stack>
        <Stack direction="row" alignItems="center" gap={1}>
          <Button onClick={backToLastMonth}>
            <ArrowBackIosIcon />
          </Button>
          <Typography variant="h5">
            {dayjs(targetYear).format("YYYY年度")}
          </Typography>
          <Button>
            <ArrowForwardIosIcon onClick={forwardToNextMonth} />
          </Button>
          <Button
            variant="outlined"
            onClick={moveToCurrentMonth}
            disabled={targetYear === dayjs().format("YYYY-MM")}
          >
            今年度に戻る
          </Button>
        </Stack>
        <YearlyResults
          userId={user.userId}
          selecetedMember={selecetedMember}
          targetYear={targetYear}
          salesResultData={salesResultData}
          applicationData={applicationData}
          routeMst={routeMst}
          consultContentMst={consultContentMst}
          productMst={productMst}
          companyMst={companyMst}
          statusMst={statusMst}
          contractBudgetData={contractBudgetData}
          postContractBudgetData={postContractBudgetData}
        />
        <Fab
          variant="extended"
          color="primary"
          onClick={handleDrawerClickOpen}
          sx={{ position: "fixed", top: 72, right: 56 }}
        >
          <VisibilityIcon sx={{ mr: 1 }} />
          未成立の申込情報
        </Fab>
        <LastApplicationDrawer
          open={openLastApplicationDrawer}
          handleDrawerClose={handleDrawerClose}
          members={members}
        />
      </Stack>
    </>
  );
};

export default YearlyPage;
