import {
  Container,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { colors } from "./utils/Constants";
import Header from "./layout/Header";
import Body from "./layout/Body";
import Footer from "./layout/Footer";

function App() {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const colorPalette =
    colorScheme === "light" ? theme.colors.light : theme.colors.dark;

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
