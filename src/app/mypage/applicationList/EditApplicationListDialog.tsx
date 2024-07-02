import { FC } from "react";
import { IndividualSalesResult } from "@/app/types";
import Button from "@mui/material/Button";

type Props = {
  salesResult: IndividualSalesResult | undefined;
};

const EditApplicationListDialog: FC<Props> = ({ salesResult }) => {
  if (!salesResult) return <></>;
  return (
    <>
      <Button>{salesResult.name}</Button>
    </>
  );
};

export default EditApplicationListDialog;
