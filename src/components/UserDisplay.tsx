import { List, ListItem } from "@mui/material";
import { getUser } from "ducks/user";
import { useSelector } from "react-redux";

function UserDisplay() {
  const user = useSelector(getUser);
  return (
    <List>
      {Object.keys(user).map((key) => (
        <ListItem key={key}>
          {key.charAt(0).toUpperCase() + key.slice(1)}:{" "}
          {user[key] ? user[key] : "empty"}
        </ListItem>
      ))}
    </List>
  );
}

export default UserDisplay;
