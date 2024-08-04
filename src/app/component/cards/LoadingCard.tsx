import React from "react";
import { FC } from "react";
import Card from "@mui/material/Card";
import CircularProgress from "@mui/material/CircularProgress";

type Props = {
  height: number;
  flex: number;
};

const LoadingCard: FC<Props> = ({ height, flex }) => {
  return (
    <Card
      sx={{
        borderRadius: "12px",
        flex: { flex },
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: { height },
      }}
    >
      <CircularProgress />
    </Card>
  );
};

export default LoadingCard;
