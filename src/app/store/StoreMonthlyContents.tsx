import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import dayjs from "dayjs";
import { FC, useState } from "react";
import { useMockData } from "../mocks";
import { resolveYear, useSalesResultApi } from "../api/useSalesResultApi";
import { useApplicationApi } from "../api/useApplicationApi";
import StoreAchievement from "./StoreAchievement";
import StoreConstract from "./StoreConstract";
import { IndividualSalesResult } from "../types";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Achievement from "../mypage/monthly/achievement/Achievement";
import { useContractBudgetApi } from "../api/useContractBudgetApi";
import Constract from "../mypage/monthly/contract/Contract";
import TargetMonthButtons from "../component/TargetMonthButtons";
import ViewModeTabs, { PageMode } from "../component/ViewModeTabs";

type Props = {
  userId: string;
  canEdit: boolean;
  inProgressSalesResultData: IndividualSalesResult[] | undefined;
};

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
  const [targetMonth, setTargetMonth] = useState<string>(
    dayjs().format("YYYY-MM")
  );
  const [viewMode, setViewMode] = useState<PageMode>("achievement");
  const [enableCompareMode, setEnableCompareMode] = useState<boolean>(false);
  const toggleenableCompareMode = () => {
    setEnableCompareMode((pre) => !pre);
  };

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
  const {
    contractBudgetData: storeContractBudgetData,
    postContractBudgetData: storePostContractBudgetData,
  } = useContractBudgetApi({
    userId: "1",
    year: resolveYear(targetMonth),
    month: targetMonth,
  });
  const { contractBudgetData: memberConstractBudget } = useContractBudgetApi({
    userId: null,
    year: resolveYear(targetMonth),
    month: targetMonth,
  });

  return (
    <>
      <Stack sx={{ width: "100%" }}>
        <Stack direction="row" justifyContent="space-between">
          <Stack direction="row" alignItems="center" ml={3} gap={2}>
            <ViewModeTabs
              viewMode={viewMode}
              setViewMode={setViewMode}
              tabValues={[
                { label: "成果", value: "achievement" },
                { label: "契約実績", value: "contract" },
              ]}
            />
            <Stack direction="row" justifyContent="flex-end">
              <FormControlLabel
                control={
                  <Switch
                    value={enableCompareMode}
                    onClick={toggleenableCompareMode}
                  />
                }
                label="メンバー別に表示する"
              />
            </Stack>
          </Stack>
          <TargetMonthButtons
            targetMonth={targetMonth}
            setTargetMonth={setTargetMonth}
          />
        </Stack>
        <Box ml="10px" mr="10px">
          <Box
            sx={{
              minHeight: "calc(100vh - 525px)",
              background: "#f5f5f5",
            }}
            borderRadius={"12px"}
            p={3}
            pt={1}
          >
            <Stack
              gap={2}
              pt={1}
              sx={{ ...(enableCompareMode && { display: "none" }) }}
            >
              {(() => {
                switch (viewMode) {
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
                        contractBudgetData={storeContractBudgetData}
                        postContractBudgetData={storePostContractBudgetData}
                        applicationData={applicationData}
                      />
                    );
                  default:
                    return <></>;
                }
              })()}
            </Stack>
            <Stack
              gap={2}
              pt={1}
              sx={{ ...(!enableCompareMode && { display: "none" }) }}
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
                        storeContractBudgetData={storeContractBudgetData}
                        storePostContractBudgetData={
                          storePostContractBudgetData
                        }
                        memberConstractBudget={memberConstractBudget}
                      />
                    );
                  default:
                    return <></>;
                }
              })()}
            </Stack>
          </Box>
        </Box>
      </Stack>
    </>
  );
};

export default StoreMonthlyContents;
