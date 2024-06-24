import { Breadcrumbs, Link, Typography } from "@mui/material";
import React from "react";

const Child1 = () => {
  return (
    <>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/page1">
          ページ１
        </Link>
        <Typography color="text.primary">Child1</Typography>
      </Breadcrumbs>
      <h1>Child1</h1>
    </>
  );
};

export default Child1;
