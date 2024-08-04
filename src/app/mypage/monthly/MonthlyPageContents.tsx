import Stack from "@mui/material/Stack";
import dayjs from "dayjs";
import { FC, useCallback, useState } from "react";
import { useMockData } from "../../mocks";
import IndividualSalesResults from "./IndividualSalesResults";
import { resolveYear, useSalesResultApi } from "../../api/useSalesResultApi";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TargetMonthButtons from "@/app/component/TargetMonthButtons";

type Props = {
  userId: string;
  canEdit: boolean;
};

export type MyPageMode = "visitor" | "applicator" | "achievement" | "contract";

const MonthlyPageContents: FC<Props> = ({ userId, canEdit }) => {
  const { routeMst, consultContentMst, productMst, companyMst, statusMst } =
    useMockData();
  const [targetMonth, setTargetMonth] = useState<string>(
    dayjs().format("YYYY-MM")
  );
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
          {/* <Stack direction="row" alignItems="center" mr={5}> */}
          <TargetMonthButtons
            targetMonth={targetMonth}
            setTargetMonth={setTargetMonth}
          />
          {/* </Stack> */}
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

export default MonthlyPageContents;
