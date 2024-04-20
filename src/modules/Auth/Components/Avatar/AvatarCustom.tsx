import * as React from "react";
import Avatar from "@mui/material/Avatar";
import { Box } from "@mui/material";


function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name: string = "null") {
  return {
    sx: {
      bgcolor: stringToColor(name),
      width: "100%",
      height: "100%",
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}

type props = {
  fullName?: string;
};

export default function AvatarCustom({ fullName }: props) {
  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <Avatar {...stringAvatar(fullName)}/>
    </Box>
  );
}
