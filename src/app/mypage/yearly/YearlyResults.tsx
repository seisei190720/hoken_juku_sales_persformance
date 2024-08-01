import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useApplicationApi } from "@/app/api/useApplicationApi";
import { useContractBudgetApi } from "@/app/api/useContractBudgetApi";
import { useSalesResultApi } from "@/app/api/useSalesResultApi";
import { useMockData } from "@/app/mocks";
import dayjs from "dayjs";
import { FC, useCallback, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import YearlyAchievementResult from "@/app/old/yearly/YearlyAchievementResult";
import YearlyConstractResult from "@/app/old/yearly/YearlyConstractResult";

type Props = {
  userId: string;
  canEdit: boolean;
};
type YearlyPageMode = "achievement" | "contract";

const YearlyResults: FC<Props> = ({ userId, canEdit }) => {
  const {
    members,
    routeMst,
    consultContentMst,
    productMst,
    companyMst,
    statusMst,
  } = useMockData();
  const [targetYear, setTargetYear] = useState<string | null>(null);
  const { salesResultData } = useSalesResultApi(
    userId === "1" ? null : userId,
    {
      status: null,
      year: targetYear,
      firstVisitDate: null,
    }
  );
  const { applicationData } = useApplicationApi({
    userId: userId === "1" ? null : userId,
    year: targetYear,
    establishDate: null,
  });
  const { contractBudgetData, postContractBudgetData } = useContractBudgetApi({
    userId: userId,
    year: targetYear,
    month: null,
  });

  const [viewMode, setViewMode] = useState<YearlyPageMode>("achievement");
  const updateViewMode = useCallback(
    (event: React.SyntheticEvent, nextView: string) => {
      setViewMode(nextView as YearlyPageMode);
    },
    []
  );

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
                    <YearlyAchievementResult
                      salesResultData={salesResultData}
                      members={members}
                      routeMst={routeMst}
                    />
                  );
                case "contract":
                  return (
                    <YearlyConstractResult
                      userId={userId}
                      canEdit={canEdit}
                      targetYear={targetYear}
                      applicationData={applicationData}
                      productMst={productMst}
                      contractBudgetData={contractBudgetData}
                      postContractBudgetData={postContractBudgetData}
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

export default YearlyResults;
