import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signup } from "../../action";
import Layout from "../../components/Layout";
import Input from "../../components/Ui/Input/Input";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { auth, user } = useSelector((state) => state);
  const userSignup = (e) => {
    e.preventDefault();
    const user = {
      firstName,
      lastName,
      email,
      password,
    };
    dispatch(signup(user));
  };
  useEffect(() => {
    if (auth.authenticate) {
      navigate("/", { replace: true });
    }
  }, []);
  console.log(user.message);
  if (user.loading) {
    return <p>Loading...</p>;
  }
  return (
    <Layout>
      <Container>
        <Row>
          <Col md={{ span: 6, offset: 3 }} className="mt-5">
            <Form onSubmit={userSignup}>
              <Row>
                <Col md={6}>
                  <Input
                    label="First Name"
                    placeholder="First Name"
                    value={firstName}
                    type="text"
                    onChange={(e) => {
                      setFirstName(e.target.value);
                    }}
                  />
                </Col>
                <Col md={6}>
                  <Input
                    label="Last Name"
                    placeholder="Last Name"
                    value={lastName}
                    type="text"
                    onChange={(e) => {
                      setLastName(e.target.value);
                    }}
                  />
                </Col>
              </Row>
              <Input
                label="Email"
                placeholder="Email"
                value={email}
                type="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <Input
                label="Password"
                placeholder="Password"
                value={password}
                type="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <p className="text-success">{user && user.message}</p>
              <Button variant="primary" type="submit">
                Signup
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default Signup;
