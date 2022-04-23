import { Box, Typography } from "@mui/material";
import { getAuth } from "firebase/auth";
import "helpers/firebase";

function UserCardComponent() {
  //   const user = useSelector(getUser);

  const auth = getAuth();
  const user = auth?.currentUser;

  return (
    <>
      {user && (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="h1">Name: {user.displayName}</Typography>
          <Typography variant="h1">Email: {user.email}</Typography>
        </Box>
      )}
    </>
  );
}

export default UserCardComponent;
