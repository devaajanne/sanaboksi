import { Container } from "@mantine/core";
import { colors } from "./utils/Constants";
import Header from "./layout/Header";
import Body from "./layout/Body";
import Footer from "./layout/Footer";
import useColorPalette from "./hook/useColorPalette";

function App() {
  const colorPalette = useColorPalette();

  return (
    <Container
      fluid
      styles={{
        root: {
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          backgroundColor: colorPalette[colors.PRIMARY_COLOR_0],
        },
      }}
    >
      <Header />
      <Container styles={{ root: { flex: 1, display: "flex" } }}>
        <Body />
      </Container>
      <Footer />
    </Container>
  );
}

export default App;
