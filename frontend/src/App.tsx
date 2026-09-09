import { Container } from "@mantine/core";
import useColorPalette from "./hook/useColorPalette";
import Body from "./layout/Body";
import Footer from "./layout/Footer";
import Header from "./layout/Header";
import { colors } from "./utils/Constants";

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
      <Body />
      <Footer />
    </Container>
  );
}

export default App;
