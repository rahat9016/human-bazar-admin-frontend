import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Layout from "../../components/Layout";
import "./style.css";

const Home = () => {
  return (
    <div>
      <Layout>
        <Container fluid>
          <Row>
            <Col md={2} className="sidebar">
              <ul>
                <li>
                  <NavLink to={"/"} end>
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to={"/products"}>Products</NavLink>
                </li>
                <li>
                  <NavLink to={"/orders"}>Orders</NavLink>
                </li>
              </ul>
            </Col>
            <Col md={8} className="asideBar">
              <h5>Container </h5>
            </Col>
          </Row>
        </Container>
      </Layout>
    </div>
  );
};

export default Home;
