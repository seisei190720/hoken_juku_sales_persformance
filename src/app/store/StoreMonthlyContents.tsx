import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import dayjs from "dayjs";
import { FC, useCallback, useEffect, useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Button from "@mui/material/Button";
import { useMockData } from "../mocks";
import { resolveYear, useSalesResultApi } from "../api/useSalesResultApi";
import { useApplicationApi } from "../api/useApplicationApi";
import StoreAchievement from "../old/store/StoreAchievement";
import StoreConstract from "../old/store/StoreConstract";
import { IndividualSalesResult } from "../types";

type Props = {
  userId: string;
  canEdit: boolean;
  inProgressSalesResultData: IndividualSalesResult[] | undefined;
};

type StorePageMode = "achievement" | "contract";

const StoreMonthlyContents: FC<Props> = ({
  userId,
  canEdit,
  inProgressSalesResultData,
}) => {
  const {
    members,
    routeMst,
    consultContentMst,
    productMst,
    companyMst,
    statusMst,
  } = useMockData();
  const [targetMonth, setTargetMonth] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<StorePageMode>("achievement");

  const updateViewMode = useCallback(
    (event: React.SyntheticEvent, nextView: string) => {
      setViewMode(nextView as StorePageMode);
    },
    []
  );
  const { salesResultData } = useSalesResultApi(null, {
    status: null,
    year: resolveYear(targetMonth),
    firstVisitDate: targetMonth,
  });
  const { applicationData } = useApplicationApi({
    userId: null,
    year: resolveYear(targetMonth),
    establishDate: targetMonth,
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

  const a11yProps = (index: number) => {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  };
  return (
    <>
      <Stack sx={{ width: "100%" }}>
        <Stack direction="row" justifyContent="space-between">
          <Stack direction="row" alignItems="center" ml={3}>
            <Button onClick={backToLastMonth}>
              <ArrowBackIosIcon />
            </Button>
            <Typography variant="h5">
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
          <Stack direction="row" alignItems="center" mr={5}>
            <Tabs
              sx={{
                marginLeft: "10px",
                marginBottom: "8px",
              }}
              value={viewMode}
              onChange={updateViewMode}
              aria-label="sales-result-view-mode-tab"
            >
              <Tab label="成果" value="achievement" {...a11yProps(0)} />
              <Tab label="契約実績" value="contract" {...a11yProps(0)} />
            </Tabs>
          </Stack>
        </Stack>
        <Box ml="10px" mr="10px">
          <Box
            sx={{
              minHeight: "calc(100vh - 200px)",
              background: "#f5f5f5",
            }}
            borderRadius={"12px"}
          >
            {(() => {
              switch (viewMode) {
                case "achievement":
                  return (
                    <StoreAchievement
                      salesResultData={salesResultData}
                      members={members}
                      routeMst={routeMst}
                      consultContentMst={consultContentMst}
                      productMst={productMst}
                      companyMst={companyMst}
                      statusMst={statusMst}
                    />
                  );
                case "contract":
                  return (
                    <StoreConstract
                      userId={userId}
                      targetMonth={targetMonth}
                      inProgressSalesResultData={inProgressSalesResultData}
                      applicationData={applicationData}
                      productMst={productMst}
                      members={members}
                    />
                  );
                default:
                  return <></>;
              }
            })()}
          </Box>
        </Box>
      </Stack>
    </>
  );
};

export default StoreMonthlyContents;
