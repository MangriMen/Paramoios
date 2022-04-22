import { Button, Container } from "@mui/material";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { userActions } from "ducks/user";

const user = {
  name: "Lox",
  email: "Kek",
};

function UserComponent() {
  const dispatch = useDispatch();
  const userCreator = useCallback(() => {
    dispatch(userActions.updateUser(user));
  }, [dispatch]);

  return (
    <Container maxWidth="lg">
      <Button variant="contained" onClick={userCreator}>
        Кнопка
      </Button>
    </Container>
  );
}

export default UserComponent;
