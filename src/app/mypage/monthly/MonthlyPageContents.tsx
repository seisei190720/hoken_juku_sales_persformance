import Stack from "@mui/material/Stack";
import dayjs from "dayjs";
import { FC, useState } from "react";
import { useMockData } from "../../mocks";
import { resolveYear, useSalesResultApi } from "../../api/useSalesResultApi";
import TargetMonthButtons from "@/app/component/TargetMonthButtons";
import ViewModeTabs, { PageMode } from "@/app/component/ViewModeTabs";
import HintToolTip from "@/app/component/HintToolTip";
import { useApplicationApi } from "@/app/api/useApplicationApi";
import { useContractBudgetApi } from "@/app/api/useContractBudgetApi";
import Box from "@mui/material/Box";
import Visitor from "./visitor/Visitor";
import Constract from "./contract/Contract";
import Achievement from "./achievement/Achievement";
import ApplicationList from "../ApplicationList";

type Props = {
  userId: string;
  canEdit: boolean;
  mutateTopicData: (mutateApp: boolean) => void;
};

const MonthlyPageContents: FC<Props> = ({
  userId,
  canEdit,
  mutateTopicData,
}) => {
  const { routeMst, consultContentMst, productMst, companyMst, statusMst } =
    useMockData();
  const [targetMonth, setTargetMonth] = useState<string>(
    dayjs().format("YYYY-MM")
  );
  const [viewMode, setViewMode] = useState<PageMode>("visitor");

  const { applicationData, mutate: mutateApplication } = useApplicationApi({
    userId: userId,
    year: resolveYear(targetMonth),
    establishDate: targetMonth,
  });

  const {
    salesResultData,
    postVisitorData,
    updateSalesResultData,
    deleteSalesResultData,
  } = useSalesResultApi(
    userId,
    {
      status: null,
      year: resolveYear(targetMonth),
      firstVisitDate: targetMonth,
    },
    () => {
      mutateTopicData(true);
      mutateApplication();
    }
  );

  const { contractBudgetData, postContractBudgetData } = useContractBudgetApi(
    {
      userId: userId,
      year: resolveYear(targetMonth),
      month: targetMonth,
    },
    mutateTopicData
  );

  return (
    <>
      <Stack sx={{ width: "100%" }}>
        <Stack direction="row" justifyContent="space-between">
          <Stack direction="row" alignItems="center" ml={3} gap={2}>
            <ViewModeTabs
              viewMode={viewMode}
              setViewMode={setViewMode}
              tabValues={[
                { label: "来店者", value: "visitor" },
                { label: "申込者", value: "applicator" },
                { label: "成果", value: "achievement" },
                { label: "契約実績", value: "contract" },
              ]}
            />
            <HintToolTip
              hintMessage={
                "契約実績は「成立日」を基準に表示しています。\n例：\n　　来店日：2000年1月10日\n　　成立日：2000年2月20日\n　　→2000年2月の契約実績に含まれる"
              }
            />
          </Stack>
          <TargetMonthButtons
            targetMonth={targetMonth}
            setTargetMonth={setTargetMonth}
          />
        </Stack>
        <Box
          sx={{
            minHeight: "calc(100vh - 525px)",
            background: "#f5f5f5",
          }}
          ml="10px"
          mr="10px"
          borderRadius={"12px"}
          p={3}
        >
          {(() => {
            switch (viewMode) {
              case "visitor":
                return (
                  <Visitor
                    userId={userId}
                    salesResultData={salesResultData}
                    postVisitorData={postVisitorData}
                    updateSalesResultData={updateSalesResultData}
                    deleteSalesResultData={deleteSalesResultData}
                    routeMst={routeMst}
                    productMst={productMst}
                    companyMst={companyMst}
                    consultContentMst={consultContentMst}
                    canEdit={canEdit}
                  />
                );
              case "applicator":
                return (
                  <ApplicationList
                    salesResultData={salesResultData}
                    updateApplicationsData={updateSalesResultData}
                    productMst={productMst}
                    companyMst={companyMst}
                    statusMst={statusMst}
                    canEdit={canEdit}
                  />
                );
              case "achievement":
                return (
                  <Achievement
                    userId={userId}
                    salesResultData={salesResultData}
                    routeMst={routeMst}
                    productMst={productMst}
                  />
                );
              case "contract":
                return (
                  <Constract
                    userId={userId}
                    targetMonth={targetMonth}
                    productMst={productMst}
                    canEdit={canEdit}
                    contractBudgetData={contractBudgetData}
                    postContractBudgetData={postContractBudgetData}
                    applicationData={applicationData}
                  />
                );
              default:
                return <></>;
            }
          })()}
        </Box>
      </Stack>
    </>
  );
};

export default MonthlyPageContents;
