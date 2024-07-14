import React, { FC } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";

const users = ["username@gmail.com", "user02@gmail.com"];

type Props = {
  open: boolean;
  onClose: () => void;
};

export const SimpleDialog: FC<Props> = ({ open, onClose }) => {
  // const {attendUsers, attendUsersLength} = useAttendUserByEventId(event?.id);
  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>参加者一覧（人）</DialogTitle>
      <List sx={{ pt: 0 }}>
        {users.map((user) => (
          <ListItem disableGutters key={user} sx={{ px: 3 }}>
            <p className="text-sm">{user}</p>
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
};
