import { Nav, NavDropdown } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { clearCart } from "../../feature/reducers/cartSlice";
import { RootState, useAppDispatch } from "../../feature/store";
import { toastOptions } from "../../helpers/toastOptions";
import "./style.css";

export default function NavBarComponent() {
  const { cartItems, totalPrice, loggedIn } = useSelector(
    (state: RootState) => state.persistedCart
  );
  const dispatch = useAppDispatch();

  function handleClearCart() {
    dispatch(clearCart());
    toast.success("Cart cleared", toastOptions);
  }

  return (
    <Navbar
      expand="lg"
      className="bg-body-tertiary fixed-top"
      data-bs-theme="dark"
    >
      <Container fluid>
        <Navbar.Brand href="/" className="me-auto">
          React-Bootstrap
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="ms-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="about">About</Nav.Link>
            <Nav.Link href="products">Products</Nav.Link>
            <NavDropdown title="" align="end">
              <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
              <NavDropdown.Item href="/settings">Settings</NavDropdown.Item>
              {loggedIn ? (
                <NavDropdown.Item>Sign out</NavDropdown.Item>
              ) : (
                <NavDropdown.Item>Sign in</NavDropdown.Item>
              )}
              <NavDropdown.Divider />
              <NavDropdown.Item href="/cart">Cart</NavDropdown.Item>
              <NavDropdown.Item>
                Items: {cartItems && cartItems.length}
              </NavDropdown.Item>
              <NavDropdown.Item>
                Total: $ {totalPrice && totalPrice.toFixed(2)}
              </NavDropdown.Item>
              <NavDropdown.Item onClick={handleClearCart}>
                Clear Cart
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
