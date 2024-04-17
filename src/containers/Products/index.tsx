import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import {
  addToCart,
  removeFromCart,
  resetProductAdded,
  resetProductRemoved,
} from "../../feature/reducers/cartSlice";
import { useGetProductsQuery } from "../../feature/reducers/storeApi";
import { RootState, useAppDispatch } from "../../feature/store";
import { toastOptions } from "../../helpers/toastOptions";
import "./style.css";

export default function Products() {
  const { data, isLoading, isError } = useGetProductsQuery();
  const { cartItems } = useSelector((state: RootState) => state.persistedCart);
  const [fetchProducts, setFetchProducts] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isLoading) {
      if (data && !fetchProducts) {
        toast.success("Products fetched successfully", toastOptions);
        setFetchProducts(true);
      } else if (isError) {
        toast.error("Failed to fetch products");
      }
    }
  }, [data, isError, isLoading, fetchProducts, dispatch]);

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

  return (
    <Container fluid>
      <h5>Products</h5>
      <hr />
      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>Error</p>
      ) : (
        <Row>
          {data &&
            data.map((product: Product, index: number) => (
              <Col
                key={product.id}
                xs={6}
                md={6}
                style={{
                  marginBottom: "2rem",
                  padding: "2rem",
                }}
              >
                <Card>
                  <Card.Header>
                    <span>{product.category}</span>
                    <span style={{ float: "right" }}>$ {product.price}</span>
                  </Card.Header>
                  <Card.Body>
                    <Card.Title>
                      <span style={{ float: "left" }}>{product.title}</span>
                      <span style={{ float: "right", fontSize: "small" }}>
                        Rating: {product.rating?.rate}
                      </span>
                    </Card.Title>
                    <br />
                    <hr />
                    <Card.Text>{product.description}</Card.Text>

                    <a
                      href={product.image as string}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        position: "absolute",
                        bottom: "10rem",
                        left: "2rem",
                      }}
                    >
                      <img
                        src={product.image}
                        alt={""}
                        className="product-img"
                      />
                    </a>
                  </Card.Body>
                  <Card.Footer>
                    <Button onClick={() => handleAddToCart(product)}>
                      Add
                    </Button>
                    <Button
                      onClick={() => handleRemoveFromCart(product)}
                      disabled={
                        cartItems.findIndex(
                          (item: Product) => item?.id === product?.id
                        ) === -1
                      }
                    >
                      Remove
                    </Button>
                    <span
                      style={{
                        float: "right",
                        display: "flex",
                        alignItems: "center",
                        height: "100%",
                      }}
                    >{`${index + 1} of ${data.length}`}</span>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
        </Row>
      )}
    </Container>
  );
}
