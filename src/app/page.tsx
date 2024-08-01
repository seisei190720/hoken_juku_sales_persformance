"use client";
import { Amplify } from "aws-amplify";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { useAuthenticator } from "@aws-amplify/ui-react"; //AmplifyでReactのuiを提供するライブラリ
import "@aws-amplify/ui-react/styles.css"; //css適用
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { useLoginUser } from "./hooks/useLoginUser";
import { MenuItem, MenuKind } from "./types";
import { useState } from "react";
import OldMyPage from "./old/mypage";
import MyPage from "./mypage";
import TopAndSideBar from "./component/TopAndSideBar";
import PersonIcon from "@mui/icons-material/Person";
import PeopleIcon from "@mui/icons-material/People";
import StorefrontIcon from "@mui/icons-material/Storefront";
import OldMemberPage from "./old/member";
import OldStorePage from "./old/store";
import YearlyPage from "./old/yearly";
import MemberPage from "./member";
import StorePage from "./store";
import DoDisturbIcon from "@mui/icons-material/DoDisturb";

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
  const [openSideMenu, setOpenSideMenu] = useState<boolean>(false);

  const handleClickSideMenu = () => {
    setOpenSideMenu((p) => !p);
  };
  const menuList: MenuItem[] = [
    { name: "マイページ", menuKind: "mypage", icon: <PersonIcon /> },
    { name: "メンバーページ", menuKind: "memberPage", icon: <PeopleIcon /> },
    { name: "店舗ページ", menuKind: "storePage", icon: <StorefrontIcon /> },
    { name: "旧マイページ", menuKind: "oldMypage", icon: <DoDisturbIcon /> },
    { name: "旧メンバーページ", menuKind: "member", icon: <DoDisturbIcon /> },
    { name: "旧店舗成績", menuKind: "oldStore", icon: <DoDisturbIcon /> },
    { name: "旧通年成績", menuKind: "year", icon: <DoDisturbIcon /> },
  ];
  return (
    // <button onClick={() => cognitoUser.signOut()}>Sign Out</button>
    // <button onClick={() => getUserAttribute()}>Sign Out</button>
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <TopAndSideBar
        cognitoUser={cognitoUser}
        openSideMenu={openSideMenu}
        handleClickSideMenu={handleClickSideMenu}
        menuList={menuList}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
      />
      <Box sx={{ width: "100%", margin: "68px 24px 24px 24px" }}>
        {(() => {
          switch (selectedMenu) {
            case "mypage":
              return <MyPage userId={user.userId} canEdit={true} />;
            case "memberPage":
              return <MemberPage userId={user.userId} canEdit={false} />;
            case "storePage":
              return <StorePage userId={user.userId} canEdit={true} />;
            case "oldMypage":
              return <OldMyPage userId={user.userId} canEdit={true} />;
            case "member":
              return <OldMemberPage user={user} />;
            case "oldStore":
              return <OldStorePage user={user} />;
            case "year":
              return <YearlyPage user={user} />;
            default:
              return <></>;
          }
        })()}
      </Box>
      {/* <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
      </Box> */}
    </Box>
  );
}

export default withAuthenticator(Home);
