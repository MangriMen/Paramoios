import { Avatar, Box, Typography, useTheme } from "@mui/material";

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

function stringAvatar(name: string) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}

function UserCardComponent() {
  //   const user = useSelector(getUser)

  const theme = useTheme();

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          mt: "1rem",
          mb: "1rem",
          flexWrap: "wrap",
        }}
      >
        <Avatar
          {...stringAvatar("Kent Dodds")}
          variant="square"
          sx={{
            width: "200px",
            height: "200px",
            border: "4px solid",
            borderRadius: "4px",
            borderColor: theme.palette.primary.main,
            fontSize: "64px",
          }}
        ></Avatar>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            ml: "1rem",
            fontSize: "32px",
            flexWrap: "wrap",
          }}
        >
          <Typography variant="h3" textAlign="center" fontSize="inherit">
            Name: LoremIpsumLoremIpsum
          </Typography>
          <Typography variant="h3" textAlign="center" fontSize="inherit">
            Email: LoremIpsumLoremIpsum
          </Typography>
        </Box>
      </Box>
    </>
  );
}

export default UserCardComponent;
