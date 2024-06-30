import { AuthUser } from "@aws-amplify/auth/cognito";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { FC } from "react";
import { useMockData } from "../mocks";
import HeaderArea from "./HeaderArea";
import VisitorList from "./visitorList";

type Props = {
  user: AuthUser;
};

const MyPage: FC<Props> = ({ user }) => {
  const { salesResults, routeMst, consultContentMst } = useMockData();
  return (
    <>
      <Stack gap={2} sx={{ width: "100%" }}>
        <Typography variant="h4">{user.username}さんの営業成績</Typography>
        <HeaderArea
          salesResults={salesResults}
          routeMst={routeMst}
          consultContentMst={consultContentMst}
        />
        <VisitorList salesResults={salesResults} />
      </Stack>
    </>
  );
};

export default MyPage;
