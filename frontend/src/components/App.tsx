import { Container } from "@mantine/core";
import Body from "./layout/Body";
import Footer from "./layout/Footer";
import Header from "./layout/Header";
import { useContext } from "react";
import { ColorPaletteContext } from "./context/ColorPaletteContext";

function App() {
  const colorPalette = useContext(ColorPaletteContext);

  return (
    <Container
      fluid
      styles={{
        root: {
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          backgroundColor: colorPalette[0],
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
