import { FC } from "react";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import Tooltip, { tooltipClasses, TooltipProps } from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

type Props = {
  hintMessage: string;
};

const HintToolTip: FC<Props> = ({ hintMessage }) => {
  return (
    <HtmlTooltip
      title={
        <Box
          sx={{
            whiteSpace: "pre-wrap",
          }}
        >
          {hintMessage}
        </Box>
      }
    >
      <HelpOutlineIcon />
    </HtmlTooltip>
  );
};

export default HintToolTip;

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "white",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 440,
    fontSize: theme.typography.pxToRem(16),
    border: "2px solid #dadde9",
  },
}));
