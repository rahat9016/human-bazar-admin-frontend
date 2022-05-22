import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Layout from "../../components/Layout";
import Input from "../../components/Ui/Input/Input";
import { useNavigate } from "react-router-dom";
import { login } from "../../action";
import { useDispatch, useSelector } from "react-redux";
const Signing = () => {
  let navigate = useNavigate();

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  //State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userLogin = (e) => {
    e.preventDefault();
    const user = {
      email,
      password,
    };
    dispatch(login(user));
  };
  useEffect(() => {
    if (auth.authenticate) {
      navigate("/", { replace: true });
    }
  }, [auth]);
  return (
    <Layout>
      <Container>
        <Row>
          <Col md={{ span: 6, offset: 3 }} className="mt-5">
            <Form onSubmit={userLogin}>
              <Input
                label="E-mail"
                placeholder="Email"
                value={email}
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                label="password"
                placeholder="Password"
                value={password}
                type="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />

              <Button variant="primary" type="submit">
                Signing
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default Signing;
