import { Container } from "@mantine/core";
import Body from "./components/layout/Body";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";

function App() {
  return (
    <Container
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header />
      <Container style={{ flex: 1, display: "flex" }}>
        <Body />
      </Container>
      <Footer />
    </Container>
  );
}

export default App;
