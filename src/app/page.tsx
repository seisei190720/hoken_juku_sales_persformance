"use client";
import { Amplify } from "aws-amplify";
import { withAuthenticator } from "@aws-amplify/ui-react";
import Image from "next/image";
import styles from "./page.module.css";
import { useAuthenticator } from "@aws-amplify/ui-react"; //AmplifyでReactのuiを提供するライブラリ
import "@aws-amplify/ui-react/styles.css"; //css適用
import * as AmazonCognitoIdentity from "amazon-cognito-identity-js";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import MenuItem from "@mui/material/MenuItem";
import { useLoginUser } from "./hooks/useLoginUser";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import CoffeeIcon from "@mui/icons-material/Coffee";

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolClientId: "570fo2tn3km1dmmsl6haa94l0k",
      userPoolId: "ap-northeast-1_llO4mR1XR",
    },
  },
});
function Home() {
  const { user, route } = useAuthenticator((context) => [context.user]);
  const { item } = useLoginUser();
  const drawerWidth = 240;
  type MenuItem = {
    name: string;
    url: string;
    icon: React.ReactNode;
  };
  const menuList: MenuItem[] = [
    { name: "マイページ", url: "/page1", icon: <BeachAccessIcon /> },
    { name: "ダッシュボード", url: "/page2", icon: <CoffeeIcon /> },
  ];
  return (
    // <main className={styles.main}>
    // <button onClick={() => cognitoUser.signOut()}>Sign Out</button>
    // <button onClick={() => getUserAttribute()}>Sign Out</button>
    /* <div className={styles.description}></div> */
    /* </main> */
    // <html lang="en">
    // <body className={inter.className}>
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            <Link href="/" underline="none" color="inherit">
              MUI 管理画面
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>
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
            {menuList.map(({ name, url, icon }: MenuItem) => (
              <ListItem key={name} disablePadding>
                <ListItemButton selected={console.log(name)}>
                  <ListItemIcon>{icon}</ListItemIcon>
                  <Link href={url} underline="none" color="inherit">
                    {name}
                  </Link>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
      </Box>
    </Box>
    // </body>
    // </html>
  );
}

export default withAuthenticator(Home);
