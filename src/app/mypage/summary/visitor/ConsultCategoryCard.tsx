import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { blue } from "@mui/material/colors";
import React from "react";
import { FC } from "react";
import Chip from "@mui/material/Chip";

type Props = {
  title: string;
  newValue: string;
  existingValue: string;
};

const ConsultCategoryCard: FC<Props> = ({ title, newValue, existingValue }) => {
  return (
    <Stack flex={1} alignItems="center">
      <Typography variant="h6" fontWeight="Medium">
        {title}
      </Typography>
      <Stack width="100%" direction="row">
        {[
          { label: "新規", color: "success" as "success", value: newValue },
          {
            label: "既契約",
            color: "warning" as "warning",
            value: existingValue,
          },
        ].map((item, index) => (
          <Stack key={index} flex={1}>
            <Stack
              direction="row"
              gap={1}
              alignItems="flex-end"
              justifyContent="center"
            >
              <Typography variant="h2" fontWeight="Medium">
                {item.value}
              </Typography>
              <Typography variant="h6">件</Typography>
            </Stack>
            <Stack width="100%" direction="row" justifyContent="center">
              <Chip
                size="small"
                label={item.label}
                color={item.color}
                sx={{ width: "70px" }}
              />
            </Stack>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};

export default ConsultCategoryCard;
