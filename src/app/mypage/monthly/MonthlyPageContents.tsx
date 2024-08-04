import Stack from "@mui/material/Stack";
import dayjs from "dayjs";
import { FC, useState } from "react";
import { useMockData } from "../../mocks";
import IndividualSalesResults from "./IndividualSalesResults";
import { resolveYear, useSalesResultApi } from "../../api/useSalesResultApi";
import TargetMonthButtons from "@/app/component/TargetMonthButtons";
import ViewModeTabs, { PageMode } from "@/app/component/ViewModeTabs";

type Props = {
  userId: string;
  canEdit: boolean;
};

const MonthlyPageContents: FC<Props> = ({ userId, canEdit }) => {
  const { routeMst, consultContentMst, productMst, companyMst, statusMst } =
    useMockData();
  const [targetMonth, setTargetMonth] = useState<string>(
    dayjs().format("YYYY-MM")
  );
  const [viewMode, setViewMode] = useState<PageMode>("visitor");

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
          </Stack>
          <TargetMonthButtons
            targetMonth={targetMonth}
            setTargetMonth={setTargetMonth}
          />
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
