import React, { useState } from "react";
import { getFirestore } from "../../backend/firebase/Firebase";
import useCartContext from "../../Context/CartContext";
import Button from "../../components/Button/Button";
import { Form, Col, Row } from "react-bootstrap";
import "./CheckoutContainer.scss";
import firebase from "firebase/app";
import { NavLink } from "react-router-dom";
import logo from "../../assets/images/logo.jpg";

const CheckoutContainer = () => {
  const { products, getGrandTotal } = useCartContext();

  const prod = products;
  const total = getGrandTotal();

  const db = getFirestore();
  const [sale, saleCompleted] = useState(false);
  const [orderId, setOrderId] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    address: "",
    state: "",
    zip: "",
  });

  const handleChangeInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const compra = {
    user: formData,
    items: prod,
    totalPrice: total,
    date: firebase.firestore.Timestamp.fromDate(new Date()),
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();

    db.collection("orders")
      .add(compra)
      .then(({ id }) => {
        saleCompleted(true);
        setOrderId(id);
      })
      .catch((err) => console.log(err));
  };

  return !sale ? (
    <div className="container checkout">
      <Row>
        <Col xs={12} md={5} className="formulario">
          <Form className="form" onSubmit={handleSubmitForm}>
            <Form.Row>
              <Form.Group as={Col} md="12">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChangeInput}
                  required
                />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} md="12">
                <Form.Label>Apellido</Form.Label>
                <Form.Control
                  type="text"
                  name="surname"
                  value={formData.surname}
                  onChange={handleChangeInput}
                  required
                />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} md="12">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChangeInput}
                  required
                />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} md="12">
                <Form.Label>Dirección</Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChangeInput}
                  required
                />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} md="6">
                <Form.Label>Estado</Form.Label>
                <Form.Control
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChangeInput}
                  required
                />
              </Form.Group>

              <Form.Group as={Col} md="6">
                <Form.Label>Zip</Form.Label>
                <Form.Control
                  type="text"
                  name="zip"
                  value={formData.zip}
                  onChange={handleChangeInput}
                  required
                />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group>
                <Form.Check
                  required
                  label="Acepta los terminos y condiciones"
                  feedback="You must agree before submitting."
                  className="term-cond"
                />
              </Form.Group>
            </Form.Row>

            <Button
              className="btn-fin"
              content={"Finalizar Compra"}
              callback="submit"
            />
          </Form>
        </Col>

        <Col xs={12} md={7} className="detalle">
          <h3>Resumen de tu Orden</h3>

          <div className="titles-checkout">
            <h5 className="title-pro">Producto</h5>
            <h5 className="title-can">Cantidad</h5>
            <h5 className="title-pr">Precio</h5>
          </div>

          {products.map((product) => {
            return (
              <div key={product.id} className={"orden-checkout"}>
                <img
                  className="img-fluid checkout-image"
                  src={product.picture}
                  alt="prod"
                />
                <h6 className="checkout-q">{product.quantity}</h6>
                <h6 className="checkout-pr">${product.price}</h6>
              </div>
            );
          })}

          <div className={"total-checkout"}>
            <h4>Total:</h4>
            <p>${getGrandTotal()}</p>
          </div>

          <div className={"btn-checkout"}>
            <Button
              className="btn-seguir"
              content={"Seguir Comprando"}
              path="/categories"
            />
          </div>
        </Col>
      </Row>
    </div>
  ) : (
    <div className="container">
      <div className="numberId">
        <p>
          La compra se realizó correctamente, tu número de seguimiento es:
          <span>{orderId}</span>
        </p>

        <NavLink to="/" className="checkoutLogo">
          <img src={logo} className="img-fluid" alt="logo" />
        </NavLink>
      </div>
    </div>
  );
};

export default CheckoutContainer;
