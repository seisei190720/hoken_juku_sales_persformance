import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import { FC, useCallback, useEffect, useState } from "react";
import { useMockData } from "../../mocks";
import IndividualSalesResults from "./IndividualSalesResults";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { resolveYear, useSalesResultApi } from "../../api/useSalesResultApi";
import Button from "@mui/material/Button";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

type Props = {
  userId: string;
  canEdit: boolean;
};

export type MyPageMode = "visitor" | "applicator" | "achievement" | "contract";

const MyPage: FC<Props> = ({ userId, canEdit }) => {
  const { routeMst, consultContentMst, productMst, companyMst, statusMst } =
    useMockData();
  const [targetMonth, setTargetMonth] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<MyPageMode>("visitor");

  const updateViewMode = useCallback(
    (event: React.SyntheticEvent, nextView: string) => {
      setViewMode(nextView as MyPageMode);
    },
    []
  );
  const a11yProps = (index: number) => {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  };
  const {
    salesResultData,
    postVisitorData,
    updateSalesResultData,
    deleteSalesResultData,
    mutate,
  } = useSalesResultApi(userId, {
    status: null,
    year: resolveYear(targetMonth),
    firstVisitDate: targetMonth,
  });

  const forwardToNextMonth = () => {
    setTargetMonth((v) => dayjs(v).add(1, "month").format("YYYY-MM"));
  };
  const backToLastMonth = () => {
    setTargetMonth((v) => dayjs(v).subtract(1, "month").format("YYYY-MM"));
  };
  const moveToCurrentMonth = () => {
    setTargetMonth(dayjs().format("YYYY-MM"));
  };

  useEffect(() => {
    setTargetMonth(dayjs().format("YYYY-MM"));
  }, [setTargetMonth]);

  return (
    <>
      <Stack sx={{ width: "100%" }}>
        <Stack direction="row" justifyContent="space-between">
          <Stack direction="row" alignItems="center" ml={3}>
            <Tabs
              sx={{
                marginLeft: "10px",
                marginBottom: "8px",
              }}
              value={viewMode}
              onChange={updateViewMode}
              aria-label="sales-result-view-mode-tab"
            >
              <Tab label="来店者" value="visitor" {...a11yProps(1)} />
              <Tab label="申込者" value="applicator" {...a11yProps(2)} />
              <Tab label="成果" value="achievement" {...a11yProps(0)} />
              <Tab label="契約実績" value="contract" {...a11yProps(0)} />
            </Tabs>
          </Stack>
          <Stack direction="row" alignItems="center" mr={5}>
            <Button onClick={backToLastMonth}>
              <ArrowBackIosIcon />
            </Button>
            <Typography variant="h6">
              {dayjs(targetMonth).format("YYYY年MM月")}
            </Typography>
            <Button>
              <ArrowForwardIosIcon onClick={forwardToNextMonth} />
            </Button>
            <Button
              variant="outlined"
              onClick={moveToCurrentMonth}
              disabled={targetMonth === dayjs().format("YYYY-MM")}
            >
              今月に戻る
            </Button>
          </Stack>
        </Stack>
        <IndividualSalesResults
          userId={userId}
          targetMonth={targetMonth}
          salesResultData={salesResultData}
          postVisitorData={postVisitorData}
          updateSalesResultData={updateSalesResultData}
          deleteSalesResultData={deleteSalesResultData}
          mutateSalesResultData={mutate}
          routeMst={routeMst}
          productMst={productMst}
          companyMst={companyMst}
          consultContentMst={consultContentMst}
          statusMst={statusMst}
          viewMode={viewMode}
          canEdit={canEdit}
        />
      </Stack>
    </>
  );
};

export default MyPage;
