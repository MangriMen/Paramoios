import { Box } from "@mui/material";
import UserCardComponent from "./UserCardComponent";

function UserPageComponent() {
  return (
    <Box maxWidth="lg" display="flex" justifyContent="center">
      <UserCardComponent />
    </Box>
  );
}

export default UserPageComponent;
