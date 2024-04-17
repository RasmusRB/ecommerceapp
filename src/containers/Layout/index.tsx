import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import NavBarComponent from "../../components/Navbar";

export default function Layout() {
  return (
    <main className="App">
      <NavBarComponent />
      <Container fluid style={{ padding: "5rem", marginTop: "2rem" }}>
        <Outlet />
      </Container>
    </main>
  );
}
