import { Button, Col, Container, Row } from "react-bootstrap";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import {
  addToCart,
  removeFromCart,
  resetProductAdded,
  resetProductRemoved,
} from "../../feature/reducers/cartSlice";
import { RootState, useAppDispatch } from "../../feature/store";
import { toastOptions } from "../../helpers/toastOptions";

export default function Cart() {
  const { cartItems } = useSelector((state: RootState) => state.persistedCart);
  const dispatch = useAppDispatch();

  function handleAddToCart(product: Product) {
    dispatch(addToCart(product));
    toast.success(`${product.title} added to cart`, toastOptions);
    dispatch(resetProductAdded());
  }

  function handleRemoveFromCart(product: Product) {
    dispatch(removeFromCart(product.id));
    toast.success(`${product.title} removed from cart`, toastOptions);
    dispatch(resetProductRemoved());
  }

  function calculateItemTotal(item: Product) {
    if (item && item.price !== undefined && item.quantity !== undefined) {
      return item.price * item.quantity;
    }
    return 0;
  }

  return (
    <Container fluid style={{ width: "1500px", top: "1rem", margin: "0" }}>
      <h5>Shopping Cart</h5>
      <hr />
        <Row>
          <Col xs={6} md={4} lg={3}>
            PRODUCT
          </Col>
          <Col xs={3} md={2} lg={2}>
            PRICE
          </Col>
          <Col xs={3} md={2} lg={2}>
            QUANTITY
          </Col>
          <Col xs={3} md={2} lg={2}>
            TOTAL
          </Col>
        </Row>
      {cartItems &&
        cartItems.map((item: Product) => (
          <Container key={item.id}>
            <Row>
              <Col xs={6} md={4} lg={3}>
                <img
                  src={item.image}
                  alt="product"
                  style={{ width: "100px", height: "100px" }}
                />
                {item.title}
              </Col>
              <Col xs={3} md={2} lg={2}>
                $ {item.price}
              </Col>
              <Col xs={3} md={2} lg={2}>
                <Button
                  variant="outline-primary"
                  onClick={() => handleRemoveFromCart(item)}
                >
                  -
                </Button>
                {item.quantity}
                <Button
                  variant="outline-primary"
                  onClick={() => handleAddToCart(item)}
                >
                  +
                </Button>
              </Col>
              <Col xs={3} md={2} lg={2}>
                $ {calculateItemTotal(item)}
              </Col>
            </Row>
          </Container>
        ))}
    </Container>
  );
}
