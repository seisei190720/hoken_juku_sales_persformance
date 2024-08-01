import Typography from "@mui/material/Typography";
import { FC } from "react";
import IndividualPageContent from "./IndividualPageContent";

type Props = {
  userId: string;
  canEdit: boolean;
};

const Mypage: FC<Props> = ({ userId, canEdit }) => {
  return (
    <>
      <Typography variant="h5">マイページ</Typography>
      <IndividualPageContent userId={userId} canEdit={canEdit} />
    </>
  );
};
export default Mypage;
