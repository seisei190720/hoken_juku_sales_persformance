import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { Dispatch, FC, SetStateAction, useCallback } from "react";

export type PageMode = "visitor" | "applicator" | "achievement" | "contract";

type Props = {
  viewMode: PageMode;
  setViewMode: Dispatch<SetStateAction<PageMode>>;
  tabValues: {
    label: string;
    value: PageMode;
  }[];
};

const ViewModeTabs: FC<Props> = ({ viewMode, setViewMode, tabValues }) => {
  const updateViewMode = useCallback(
    (event: React.SyntheticEvent, nextView: string) => {
      setViewMode(nextView as PageMode);
    },
    []
  );
  const a11yProps = (index: number) => {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  };
  return (
    <Tabs
      sx={{
        marginLeft: "10px",
        marginBottom: "8px",
      }}
      value={viewMode}
      onChange={updateViewMode}
      aria-label="sales-result-view-mode-tab"
    >
      {tabValues.map((t) => (
        <Tab label={t.label} value={t.value} {...a11yProps(0)} />
      ))}
    </Tabs>
  );
};

export default ViewModeTabs;
