import { FC } from "react";
import { blue, grey } from "@mui/material/colors";
import PersonIcon from "@mui/icons-material/Person";
import Stack from "@mui/material/Stack";
import { Typography } from "@mui/material";

type Props = {
  message: string;
  subMessage: string;
};
const EmptyState: FC<Props> = ({ message, subMessage }) => {
  return (
    <Stack flex={1} justifyContent="center" alignItems="center">
      <PersonIcon
        sx={{
          fill: blue[100],
          stroke: blue[300],
          strokeWidth: 0.2,
          fontSize: "200px",
        }}
      />
      <Typography variant="h5">{message}</Typography>
      <Typography variant="h6" color={grey[600]}>
        {subMessage}
      </Typography>
    </Stack>
  );
};

export default EmptyState;
