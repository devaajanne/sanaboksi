import { Container } from "@mantine/core";
import Body from "./layout/Body";
import Footer from "./layout/Footer";
import Header from "./layout/Header";

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
