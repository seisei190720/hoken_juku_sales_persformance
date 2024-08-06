import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { FC, useState } from "react";
import { TopicBudgetAndAchievementType } from "../top/hooks/useTopicAchievementComposition";
import SimpleSummaryCard from "../../component/cards/SimpleSummaryCard";
import SimpleSummaryCardWichHalfPieChart from "../../component/charts/SimpleSummaryCardWithHalfPieChart";
import Box from "@mui/material/Box";
import YearlyResults from "./YearlyResults";
import { useCountDownYearDate } from "@/app/hooks/util";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";

type Props = {
  userId: string;
  canEdit: boolean;
  topicData: {
    yearBudgetAndAchievementData: TopicBudgetAndAchievementType | undefined;
    monthBudgetAndAchievementData: TopicBudgetAndAchievementType | undefined;
  };
  lastAppComposition: {
    lastApplicationData:
      | {
          count: number;
          sum: number;
        }
      | undefined;
  };
};
const YearlyPage: FC<Props> = ({
  userId,
  canEdit,
  topicData,
  lastAppComposition,
}) => {
  const [displayTopic, setDisplayTopic] = useState<boolean>(true);
  const dateData = useCountDownYearDate();

  return (
    <>
      <Stack gap={3}>
        <Box
          ml={1}
          mr={1}
          sx={{
            background: "#f5f5f5",
          }}
          borderRadius={"12px"}
          p={2}
        >
          <Stack direction="row" justifyContent="space-between" pr={2}>
            <Typography variant="h6">今年度のトピック</Typography>
            {displayTopic ? (
              <IconButton
                aria-label="close"
                size="small"
                color="primary"
                onClick={() => setDisplayTopic(false)}
              >
                <VisibilityOffIcon />
              </IconButton>
            ) : (
              <IconButton
                aria-label="close"
                size="small"
                color="primary"
                onClick={() => setDisplayTopic(true)}
              >
                <VisibilityIcon />
              </IconButton>
            )}
          </Stack>
          {displayTopic && (
            <Stack direction="row" gap={3}>
              <SimpleSummaryCard
                values={{
                  mainValue: dateData.lastDays,
                  subValue: `経過率：${dateData.progressRate}%`,
                }}
                title={"残り日数"}
                mainUnit={"日"}
                height={180}
                hintMessage={"次の6月30日(年度末)までの日数を表示しています。"}
              />
              <SimpleSummaryCardWichHalfPieChart
                values={topicData.yearBudgetAndAchievementData}
                title={`今年度の実績`}
              />
              <SimpleSummaryCard
                values={
                  lastAppComposition.lastApplicationData && {
                    mainValue: lastAppComposition.lastApplicationData.sum,
                    subValue: `${lastAppComposition.lastApplicationData.count}件`,
                  }
                }
                title={"未成立の申込残り"}
                mainUnit={"円"}
                height={180}
              />
            </Stack>
          )}
        </Box>
        <YearlyResults userId={userId} canEdit={canEdit} />
      </Stack>
    </>
  );
};
export default YearlyPage;
