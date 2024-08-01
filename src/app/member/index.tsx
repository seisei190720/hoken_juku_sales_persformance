import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { FC, useState } from "react";
import { useMockData } from "../mocks";
import { Member } from "../types";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import IndividualPageContent from "../mypage/IndividualPageContent";

type Props = {
  userId: string;
  canEdit: boolean;
};

const MemberPage: FC<Props> = ({ userId, canEdit }) => {
  const { members } = useMockData();
  const [selecetedMember, setSelectedMember] = useState<Member | null>(null);
  const handleMemberSelector = (e: SelectChangeEvent) => {
    setSelectedMember(members.find((m) => e.target.value === m.id) || null);
  };

  return (
    <>
      <Stack direction="row" gap={4} alignItems="flex-start">
        <Typography variant="h5">メンバーページ</Typography>
        <Stack direction="row" gap={1} alignItems="center">
          <FormControl size="small">
            <InputLabel id="showing-member-select-label">メンバー</InputLabel>
            <Select
              sx={{
                width: "150px",
              }}
              labelId="showing-member-select-label"
              id="showing-member-select"
              value={selecetedMember === null ? "" : selecetedMember.id}
              label="Member"
              onChange={handleMemberSelector}
            >
              {members
                .filter((m) => m.id !== userId)
                .map((member, idx) => {
                  return (
                    <MenuItem value={member.id} key={`${idx}_${member.name}`}>
                      {member.name}
                    </MenuItem>
                  );
                })}
            </Select>
          </FormControl>
          <Typography variant="subtitle1">を表示中</Typography>
        </Stack>
      </Stack>
      {selecetedMember === null ? (
        <Stack m={2}>
          <Typography>表示したいメンバーを選択してください。</Typography>
        </Stack>
      ) : (
        <IndividualPageContent userId={selecetedMember.id} canEdit={false} />
      )}
    </>
  );
};
export default MemberPage;
