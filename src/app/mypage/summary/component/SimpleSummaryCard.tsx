import Typography from "@mui/material/Typography";
import { blue } from "@mui/material/colors";
import React from "react";
import { FC } from "react";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";

type Props = {
  title: string;
  mainValue: number;
  mainUnit: string;
  subValue: string;
};

const SimpleSummaryCard: FC<Props> = ({
  title,
  mainValue,
  mainUnit,
  subValue,
}) => {
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
              {mainValue}
            </Typography>
            <Typography variant="h6">{mainUnit}</Typography>
          </Stack>
          <Typography variant="h5" color="gray">
            {subValue}
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
};

export default SimpleSummaryCard;
