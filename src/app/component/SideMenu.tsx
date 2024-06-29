import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import { MenuItem, MenuKind } from "../types";
import { Dispatch, FC, SetStateAction } from "react";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";

type Props = {
  menuList: MenuItem[];
  selectedMenu: MenuKind;
  setSelectedMenu: Dispatch<SetStateAction<MenuKind>>;
};

const drawerWidth = 240;
const SideMenu: FC<Props> = ({ menuList, selectedMenu, setSelectedMenu }) => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: "auto" }}>
        <List>
          {menuList.map(({ name, menuKind, icon }: MenuItem) => (
            <ListItem key={name} disablePadding>
              {/* <ListItemButton selected={}> */}
              <ListItemButton
                onClick={() => setSelectedMenu(menuKind)}
                selected={menuKind === selectedMenu}
              >
                <ListItemIcon>{icon}</ListItemIcon>
                {/* <Link href={url} underline="none" color="inherit"> */}
                {name}
                {/* </Link> */}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default SideMenu;
