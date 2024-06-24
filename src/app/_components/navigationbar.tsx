"use client";
import { AppBar, Toolbar, Typography, Link } from "@mui/material";
import React from "react";

const NavigationBar = () => {
  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          <Link href="/" underline="none" color="inherit">
            ほけん塾 営業成績管理システム
          </Link>
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;