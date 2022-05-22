import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategory } from "../../action/category.action";
import Layout from "../../components/Layout";

const Category = () => {
  const category = useSelector((state) => state.category);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCategory());
  }, []);

  //Render Categories
  const renderCategories = (categories) => {
    let myCategories = [];
    for (let category of categories) {
      myCategories.push(
        <li>
          {category.name}
          {category.children.length > 0 ? (
            <ul>{renderCategories(category.children)}</ul>
          ) : null}
        </li>
      );
    }
    return myCategories;
  };
  return (
    <div>
      <Layout sidebar>
        <Container>
          <Row>
            <Col md={12}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h1>Category</h1>
                <button className="btn btn-info">Add Category</button>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <ul>{renderCategories(category.categories)}</ul>
            </Col>
          </Row>
        </Container>
      </Layout>
    </div>
  );
};

export default Category;
