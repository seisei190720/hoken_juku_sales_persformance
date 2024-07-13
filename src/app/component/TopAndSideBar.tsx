import Box from "@mui/material/Box";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { MenuItem, MenuKind } from "../types";
import { Dispatch, FC, SetStateAction } from "react";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Divider from "@mui/material/Divider";
import MuiDrawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { CognitoUser } from "amazon-cognito-identity-js";

type Props = {
  cognitoUser: CognitoUser | null;
  openSideMenu: boolean;
  handleClickSideMenu: () => void;
  menuList: MenuItem[];
  selectedMenu: MenuKind;
  setSelectedMenu: Dispatch<SetStateAction<MenuKind>>;
};

const drawerWidth = 240;

const TopAndSideBar: FC<Props> = ({
  cognitoUser,
  openSideMenu,
  handleClickSideMenu,
  menuList,
  selectedMenu,
  setSelectedMenu,
}) => {
  const theme = useTheme();

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={openSideMenu}>
        <Toolbar variant="dense">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleClickSideMenu}
            edge="start"
            sx={{
              marginRight: 5,
              ...(openSideMenu && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            ほけん塾 営業成績管理
          </Typography>
          {cognitoUser !== null && (
            <Button color="inherit" onClick={() => cognitoUser.signOut()}>
              SignOut
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={openSideMenu}>
        <DrawerHeader>
          <IconButton onClick={handleClickSideMenu}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <Box>
          <List>
            {menuList.map(({ name, menuKind, icon }: MenuItem) => (
              <ListItem key={name} disablePadding>
                <ListItemButton
                  onClick={() => setSelectedMenu(menuKind)}
                  selected={menuKind === selectedMenu}
                >
                  <ListItemIcon>{icon}</ListItemIcon>
                  {name}
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
};

export default TopAndSideBar;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  height: "48px",
  // necessary for content to be below app bar
  // ...theme.mixins.toolbar, //これがあると、drawerのheightが64pxになってしまう
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));
