import Stack from "@mui/material/Stack";
import { useApplicationApi } from "@/app/api/useApplicationApi";
import { useContractBudgetApi } from "@/app/api/useContractBudgetApi";
import { useSalesResultApi } from "@/app/api/useSalesResultApi";
import { useMockData } from "@/app/mocks";
import dayjs from "dayjs";
import { FC, useState } from "react";
import Box from "@mui/material/Box";
import YearlyAchievementResult from "@/app/mypage/yearly/YearlyAchievementResult";
import YearlyConstractResult from "@/app/mypage/yearly/YearlyConstractResult";
import TargetYearButtons from "@/app/component/TargetYearButtons";
import ViewModeTabs, { PageMode } from "@/app/component/ViewModeTabs";
import HintToolTip from "@/app/component/HintToolTip";

type Props = {
  userId: string;
  canEdit: boolean;
};

const YearlyResults: FC<Props> = ({ userId, canEdit }) => {
  const {
    members,
    routeMst,
    consultContentMst,
    productMst,
    companyMst,
    statusMst,
  } = useMockData();
  const [targetYear, setTargetYear] = useState<string>(dayjs().format("YYYY"));
  const [viewMode, setViewMode] = useState<PageMode>("achievement");

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

  return (
    <>
      <Stack sx={{ width: "100%" }}>
        <Stack direction="row" justifyContent="space-between">
          <Stack direction="row" alignItems="center" ml={3} gap={1}>
            <ViewModeTabs
              viewMode={viewMode}
              setViewMode={setViewMode}
              tabValues={[
                { label: "成果", value: "achievement" },
                { label: "契約実績", value: "contract" },
              ]}
            />
            <HintToolTip
              hintMessage={
                "契約実績は「成立日」を基準に表示しています。\n例：\n　　来店日：2024年8月10日\n　　成立日：2024年9月20日\n　　→2024年9月の契約実績に含まれる"
              }
            />
          </Stack>
          <TargetYearButtons
            targetYear={targetYear}
            setTargetYear={setTargetYear}
          />
        </Stack>
        <Box ml="10px" mr="10px">
          <Box
            sx={{
              minHeight: "calc(100vh - 525px)",
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
