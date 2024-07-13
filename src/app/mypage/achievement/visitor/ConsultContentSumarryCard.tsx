import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { blue } from "@mui/material/colors";
import React from "react";
import { FC } from "react";
import ConsultCategoryCard from "./ConsultCategoryCard";
import CircularProgress from "@mui/material/CircularProgress";

type Props = {
  consultContent:
    | {
        life: {
          new: number;
          exist: number;
        };
        nonLife: {
          new: number;
          exist: number;
        };
      }
    | undefined;
};

const ConsultContentSumarryCard: FC<Props> = ({ consultContent }) => {
  if (!consultContent)
    return (
      <Card
        sx={{
          borderRadius: "12px",
          flex: 2,
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
    <Card sx={{ padding: 2, borderRadius: "12px", flex: 2 }}>
      <Stack height="100%">
        <Typography variant="h6" color={blue[600]}>
          {"相談内容"}
        </Typography>
        <Stack
          direction="row"
          justifyContent="center"
          flex={1}
          divider={<Divider orientation="vertical" />}
        >
          <ConsultCategoryCard
            title="生保"
            newValue={consultContent.life.new}
            existingValue={consultContent.life.exist}
          />
          <ConsultCategoryCard
            title="損保"
            newValue={consultContent.nonLife.new}
            existingValue={consultContent.nonLife.exist}
          />
        </Stack>
      </Stack>
    </Card>
  );
};

export default ConsultContentSumarryCard;
