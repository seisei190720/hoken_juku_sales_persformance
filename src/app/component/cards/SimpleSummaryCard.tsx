import Typography from "@mui/material/Typography";
import { blue } from "@mui/material/colors";
import React from "react";
import { FC } from "react";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";

type Props = {
  values:
    | {
        mainValue: number;
        subValue: string;
      }
    | undefined;
  title: string;
  mainUnit: string;
};

const SimpleSummaryCard: FC<Props> = ({ values, title, mainUnit }) => {
  if (!values)
    return (
      <Card
        sx={{
          borderRadius: "12px",
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: 215,
        }}
      >
        <CircularProgress />
      </Card>
    );
  return (
    <Card sx={{ padding: 2, borderRadius: "12px", flex: 1 }}>
      <Stack height="100%">
        <Typography variant="h6" color={blue[600]}>
          {title}
        </Typography>
        <Stack
          direction="column"
          alignItems="center"
          justifyContent="center"
          flex={1}
        >
          <Stack
            direction="row"
            gap={1}
            alignItems="flex-end"
            justifyContent="center"
          >
            <Typography variant="h2" fontWeight={"Medium"}>
              {values.mainValue.toLocaleString()}
            </Typography>
            <Typography variant="h6">{mainUnit}</Typography>
          </Stack>
          <Typography variant="h5" color="gray">
            {values.subValue}
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
};

export default SimpleSummaryCard;
