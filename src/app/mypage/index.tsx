import { AuthUser } from "@aws-amplify/auth/cognito";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { FC } from "react";
import { useMockData } from "../mocks";
import IndividualSalesResults from "./visitorList/IndividualSalesResults";

type Props = {
  user: AuthUser;
};

const MyPage: FC<Props> = ({ user }) => {
  const { routeMst, consultContentMst, productMst, companyMst, statusMst } =
    useMockData();

  return (
    <>
      <Stack gap={1} sx={{ width: "100%" }}>
        <Typography variant="h5">{user.username}さんの営業成績</Typography>
        <IndividualSalesResults
          userId={user.userId}
          routeMst={routeMst}
          productMst={productMst}
          companyMst={companyMst}
          consultContentMst={consultContentMst}
          statusMst={statusMst}
          canEdit={true}
        />
      </Stack>
    </>
  );
};

export default MyPage;
