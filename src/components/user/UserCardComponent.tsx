import { Avatar, Box, Typography, useTheme } from "@mui/material";
import { getAuth } from "firebase/auth";

function UserCardComponent() {
  const auth = getAuth();
  const user = auth?.currentUser;

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
          variant="square"
          sx={{
            width: "200px",
            height: "200px",
            border: "4px solid",
            borderRadius: "4px",
            borderColor: theme.palette.primary.main,
            fontSize: "128px",
          }}
        >
          {user?.displayName?.toString().charAt(0)}
        </Avatar>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            ml: "1rem",
            mr: "1rem",
            fontSize: {
              lg: "32px",
              xs: "28px",
            },
            flexWrap: "wrap",
          }}
        >
          <Typography variant="h3" fontSize="inherit">
            Name: {user?.displayName}
          </Typography>
          <Typography variant="h3" fontSize="inherit">
            Email: {user?.email}
          </Typography>
        </Box>
      </Box>
    </>
  );
}

export default UserCardComponent;
