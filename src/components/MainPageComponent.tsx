import { Container, Typography, useTheme } from "@mui/material";

function MainPageComponent() {
  const theme = useTheme();
  return (
    <Container
      maxWidth="lg"
      sx={{
        mt: "1rem",
        backgroundColor: theme.palette.secondary.main,
        border: "4px solid",
        borderColor: theme.palette.primary.main,
        borderRadius: "4px",
        height: "500px",
      }}
    >
      <Typography>Hello World</Typography>
    </Container>
  );
}

export default MainPageComponent;
