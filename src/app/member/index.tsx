import { AuthUser } from "@aws-amplify/auth/cognito";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { FC, useState } from "react";
import { useMockData } from "../mocks";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { Member } from "../types";
import MyPage from "../mypage";

type Props = {
  user: AuthUser;
};

const MemberPage: FC<Props> = ({ user }) => {
  const { members } = useMockData();
  const [selecetedMember, setSelectedMember] = useState<Member | null>(null);
  const handleMemberSelector = (e: SelectChangeEvent) => {
    setSelectedMember(members.find((m) => e.target.value === m.id) || null);
  };

  return (
    <>
      <Stack gap={1} sx={{ width: "100%" }}>
        {/* <Stack direction="row" gap={5} alignItems="center"> */}
        {/* <Typography variant="h5">メンバーの営業成績</Typography> */}
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
              {members.map((member, idx) => {
                return (
                  <MenuItem value={member.id} key={`${idx}_${member.name}`}>
                    {member.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <Typography variant="subtitle1">を表示中</Typography>
          {/* </Stack> */}
        </Stack>
        {selecetedMember === null ? (
          <Typography>表示したいメンバーを選択してください。</Typography>
        ) : (
          <MyPage
            userId={selecetedMember.id}
            canEdit={selecetedMember.id === user.userId}
          />
        )}
      </Stack>
    </>
  );
};

export default MemberPage;
