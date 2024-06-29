import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

const TopBar = () => {
  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          <Link href="/" underline="none" color="inherit">
            ほけん塾 営業成績管理
          </Link>
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
