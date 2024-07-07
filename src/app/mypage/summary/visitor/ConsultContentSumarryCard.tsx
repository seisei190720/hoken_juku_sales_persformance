import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { blue } from "@mui/material/colors";
import React from "react";
import { FC } from "react";
import ConsultCategoryCard from "./ConsultCategoryCard";

type Props = {};

const ConsultContentSumarryCard: FC<Props> = ({}) => {
  return (
    <Card sx={{ padding: 2, borderRadius: "12px", flex: 2 }}>
      <Stack height="100%">
        <Typography variant="h6" color={blue[600]}>
          {"相談内容"}
        </Typography>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          flex={1}
          divider={<Divider orientation="vertical" />}
        >
          <ConsultCategoryCard title="生保" newValue="48" existingValue="65" />
          <ConsultCategoryCard title="損保" newValue="92" existingValue="53" />
        </Stack>
      </Stack>
    </Card>
  );
};

export default ConsultContentSumarryCard;
