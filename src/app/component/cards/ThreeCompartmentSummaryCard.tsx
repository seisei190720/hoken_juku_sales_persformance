import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { blue } from "@mui/material/colors";
import { FC } from "react";
import React from "react";
import Chip from "@mui/material/Chip";
import LoadingCard from "./LoadingCard";

type Props = {
  values:
    | {
        mainValue: number;
        sub1Value: string;
        sub2Value: string;
      }
    | undefined;
  title: string;
  mainUnit: string;
  sub1ChipName: string;
  sub2ChipName: string;
  cardFlex: number;
};
const ThreeCompartmentSummaryCard: FC<Props> = ({
  values,
  title,
  mainUnit,
  sub1ChipName,
  sub2ChipName,
  cardFlex,
}) => {
  if (!values) return <LoadingCard height={215} flex={cardFlex} />;
  return (
    <Card
      sx={{
        padding: 2,
        borderRadius: "12px",
        flex: cardFlex,
      }}
    >
      <Stack divider={<Divider orientation="horizontal" flexItem />}>
        <Stack>
          <Typography variant="h6" color={blue[600]}>
            {title}
          </Typography>
          <Stack
            direction="row"
            gap={1}
            alignItems="flex-end"
            justifyContent="center"
            mb={1}
          >
            <Typography variant="h2" fontWeight={"Medium"}>
              {values.mainValue.toLocaleString()}
            </Typography>
            <Typography variant="h6">{mainUnit}</Typography>
          </Stack>
        </Stack>
        <Stack
          direction="row"
          gap={1}
          divider={<Divider orientation="vertical" flexItem />}
        >
          <Stack
            direction="column"
            alignItems="center"
            flex={1}
            pt={2}
            pr={2}
            pl={2}
          >
            <Typography variant="h5">{values.sub1Value}</Typography>
            <Chip
              size="small"
              label={sub1ChipName}
              color={"success"}
              sx={{ width: "70px" }}
            />
          </Stack>
          <Stack
            direction="column"
            alignItems="center"
            flex={1}
            pt={2}
            pr={2}
            pl={2}
          >
            <Typography variant="h5">{values.sub2Value}</Typography>
            <Chip
              size="small"
              label={sub2ChipName}
              color={"warning"}
              sx={{ width: "70px" }}
            />
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
};

export default ThreeCompartmentSummaryCard;
