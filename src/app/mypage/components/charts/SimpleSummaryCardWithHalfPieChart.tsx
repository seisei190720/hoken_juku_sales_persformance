import Typography from "@mui/material/Typography";
import { blue } from "@mui/material/colors";
import React, { useMemo } from "react";
import { FC } from "react";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import BudgetAchievementHalfPieChart from "./BudgetAchievementHalfPieChart";
import { TopicBudgetAndAchievementType } from "../../top/hooks/useTopicAchievementComposition";

type Props = {
  values: TopicBudgetAndAchievementType | undefined;
  title: string;
};

const SimpleSummaryCardWichHalfPieChart: FC<Props> = ({ values, title }) => {
  const displayValues = useMemo(() => {
    if (!values) return;
    if (values.見込額 === undefined)
      return {
        main: values.実績.toLocaleString(),
        sub: `目標：${values.予算.toLocaleString()}円`,
      };

    return {
      main: (values.実績 + values.見込額).toLocaleString(),
      sub: `目標：${values.予算.toLocaleString()}円`,
    };
  }, [values]);
  if (!values || !displayValues)
    return (
      <Card
        sx={{
          borderRadius: "12px",
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: 180,
        }}
      >
        <CircularProgress />
      </Card>
    );
  return (
    <Card sx={{ padding: 2, borderRadius: "12px", flex: 1.5, height: "180px" }}>
      <Stack height="100%">
        <Typography variant="h6" color={blue[600]}>
          {title}
        </Typography>
        <Stack direction="row">
          <Stack
            direction="column"
            alignItems="center"
            justifyContent="center"
            flex={1.3}
          >
            <Stack
              direction="row"
              gap={1}
              alignItems="flex-end"
              justifyContent="center"
            >
              <Typography variant="h2" fontWeight={"Medium"}>
                {displayValues.main}
              </Typography>
              <Typography variant="h6">円</Typography>
            </Stack>
            <Typography variant="h5" color="gray">
              {displayValues.sub}
            </Typography>
          </Stack>
          <BudgetAchievementHalfPieChart values={values} />
        </Stack>
      </Stack>
    </Card>
  );
};

export default SimpleSummaryCardWichHalfPieChart;
