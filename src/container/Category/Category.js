import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addCategory } from "../../action/category.action";
import Layout from "../../components/Layout";
import Input from "../../components/Ui/Input/Input";
import NewModal from "../../components/Ui/Modal/NewModal";

const Category = () => {
  const [show, setShow] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [parentCategoryId, setParentCategoryId] = useState("");
  const [categoryImage, setCategoryImage] = useState("");
  const handleClose = () => {
    const form = new FormData();
    form.append("name", categoryName);
    form.append("parentId", parentCategoryId);
    form.append("categoryImage", categoryImage);
    dispatch(addCategory(form));
    setCategoryName("");
    setParentCategoryId("");
    setShow(false);
  };
  const handleShow = () => setShow(true);
  const category = useSelector((state) => state.category);
  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(getAllCategory());
  // }, []);

  //Render Categories
  const renderCategories = (categories) => {
    let myCategories = [];
    for (let category of categories) {
      myCategories.push(
        <li key={category.name}>
          {category.name}
          {category.children.length > 0 ? (
            <ul>{renderCategories(category.children)}</ul>
          ) : null}
        </li>
      );
    }
    return myCategories;
  };
  //Create category list
  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({ value: category._id, name: category.name });
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }
    return options;
  };
  const handleCategoryImage = (e) => {
    setCategoryImage(e.target.files[0]);
  };
  return (
    <div>
      <Layout sidebar>
        <Container>
          <Row>
            <Col md={12}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h1>Category</h1>
                <button className="btn btn-info" onClick={handleShow}>
                  Add Category
                </button>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <ul>
                {renderCategories(category.categories)}
                {JSON.stringify(createCategoryList(category.categories))}
              </ul>
            </Col>
          </Row>
        </Container>
        <NewModal
          show={show}
          handleClose={handleClose}
          modalTitle={`Add New Category`}
        >
          <Input
            value={categoryName}
            placeholder={`Category Name`}
            onChange={(e) => setCategoryName(e.target.value)}
          />
          <select
            className="form-control"
            value={parentCategoryId}
            onChange={(e) => setParentCategoryId(e.target.value)}
          >
            <option>Select Category</option>
            {createCategoryList(category.categories).map((category) => (
              <option key={category.value} value={category.value}>
                {category.name}
              </option>
            ))}
          </select>
          <input
            type="file"
            name="categoryImage"
            className="form-control"
            onChange={handleCategoryImage}
          />
        </NewModal>
      </Layout>
    </div>
  );
};

export default Category;
