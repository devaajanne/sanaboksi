import { Container } from "@mantine/core";
import Body from "./layout/Body";
import Footer from "./layout/Footer";
import Header from "./layout/Header";
import { useColorPalette } from "../hooks/useColorPalette";
import { colorPaletteConstants } from "../utility/Constants";

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
          backgroundColor: colorPalette[colorPaletteConstants.PRIMARY_COLOR_0],
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
