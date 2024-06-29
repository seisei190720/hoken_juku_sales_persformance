import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useMockData } from "../mocks";

const Dashboard = () => {
  return (
    <>
      <Stack gap={2} sx={{ width: "100%" }}>
        <Typography>ダッシュボードのページです</Typography>
        <Button variant="outlined">Outlined</Button>{" "}
      </Stack>
    </>
  );
};

export default Dashboard;
