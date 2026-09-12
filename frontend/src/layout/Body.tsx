import { Container } from "@mantine/core";
import Game from "../components/game/Game";

export default function Body() {
  return (
    <Container
      component="main"
      fluid
      styles={{
        root: {
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center"
        }
      }}
    >
      <Game />
    </Container>
  );
}
