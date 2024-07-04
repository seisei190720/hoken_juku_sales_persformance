"use client";
import { Amplify } from "aws-amplify";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { useAuthenticator } from "@aws-amplify/ui-react"; //AmplifyでReactのuiを提供するライブラリ
import "@aws-amplify/ui-react/styles.css"; //css適用
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { useLoginUser } from "./hooks/useLoginUser";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import CoffeeIcon from "@mui/icons-material/Coffee";
import TopBar from "./component/topBar";
import { MenuItem, MenuKind } from "./types";
import SideMenu from "./component/SideMenu";
import { useState } from "react";
import Dashboard from "./dashboard";
import MyPage from "./mypage";

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
  const { cognitoUser } = useLoginUser();
  const [selectedMenu, setSelectedMenu] = useState<MenuKind>("mypage");

  const menuList: MenuItem[] = [
    { name: "マイページ", menuKind: "mypage", icon: <BeachAccessIcon /> },
    { name: "ダッシュボード", menuKind: "dashboard", icon: <CoffeeIcon /> },
  ];
  return (
    // <button onClick={() => cognitoUser.signOut()}>Sign Out</button>
    // <button onClick={() => getUserAttribute()}>Sign Out</button>
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <TopBar />
      <SideMenu
        menuList={menuList}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
      />
      <Box sx={{ width: "100%", margin: "84px 24px 24px 24px" }}>
        {(() => {
          switch (selectedMenu) {
            case "mypage":
              return <MyPage user={user} />;
            case "dashboard":
              return <Dashboard user={user} />;
            default:
              return <></>;
          }
        })()}
      </Box>
      {/* <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
      </Box> */}
      {cognitoUser !== null && (
        <button onClick={() => cognitoUser.signOut()}>Sign Out</button>
      )}
    </Box>
  );
}

export default withAuthenticator(Home);
