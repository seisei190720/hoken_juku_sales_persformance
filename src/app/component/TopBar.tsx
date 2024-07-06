import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { CognitoUser } from "amazon-cognito-identity-js";
import { FC } from "react";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";

type Props = {
  cognitoUser: CognitoUser | null;
};

const TopBar: FC<Props> = ({ cognitoUser }) => {
  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          <Link href="/" underline="none" color="inherit">
            ほけん塾 営業成績管理
          </Link>
        </Typography>
        {cognitoUser !== null && (
          <Button color="inherit" onClick={() => cognitoUser.signOut()}>
            SignOut
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
