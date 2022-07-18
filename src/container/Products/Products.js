import React, { useState } from "react";
import Layout from "../../components/Layout";
import { Container, Row, Table, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Input from "../../components/Ui/Input/Input";
import { addProduct } from "../../action/product.action";
import NewModal from "../../components/Ui/Modal/NewModal";
import "./style.css";
import { generatePublicUrl } from "../../urlConfig";
const Products = () => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [productPictures, setProductPictures] = useState([]);
  const [productDetailModal, setProductDetailModal] = useState(false);
  const [productDetails, setProductDetails] = useState(null);
  const dispatch = useDispatch();
  const category = useSelector((state) => state.category);
  const product = useSelector((state) => state.product);
  const handleShow = () => setShow(true);
  const handleClose = () => {
    const form = new FormData();
    form.append("name", name);
    form.append("quantity", quantity);
    form.append("price", price);
    form.append("description", description);
    form.append("categoryId", categoryId);
    for (let pic of productPictures) {
      form.append("productPicture", pic);
    }

    dispatch(addProduct(form));
    setShow(false);
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
  const handleProductPicture = (e) => {
    setProductPictures([...productPictures, e.target.files[0]]);
  };

  const renderProducts = () => (
    <Table responsive>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Category</th>
        </tr>
      </thead>
      <tbody>
        {product.products.length > 0
          ? product.products.map((product, index) => (
              <tr key={index} onClick={() => showProductDetailsModal(product)}>
                <td>{index}</td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.quantity}</td>
                <td>{product.category.name}</td>
              </tr>
            ))
          : null}
      </tbody>
    </Table>
  );
  const renderAddProductModal = () => (
    <NewModal show={show} handleClose={handleClose} modalTitle={`Add Product`}>
      <Input
        label="Name"
        value={name}
        placeholder={`Product Name`}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        label="Quantity"
        value={quantity}
        placeholder={`Quantity`}
        onChange={(e) => setQuantity(e.target.value)}
      />
      <Input
        label="Price"
        value={price}
        placeholder={`Price`}
        onChange={(e) => setPrice(e.target.value)}
      />
      <Input
        label="Description"
        value={description}
        placeholder={`Description`}
        onChange={(e) => setDescription(e.target.value)}
      />
      <select
        className="form-control"
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
      >
        <option>Select Category</option>
        {createCategoryList(category.categories).map((category) => (
          <option key={category.value} value={category.value}>
            {category.name}
          </option>
        ))}
      </select>
      {productPictures.length > 0
        ? productPictures.map((pic, index) => (
            <div key={index}>{JSON.stringify(pic.name)}</div>
          ))
        : null}
      <input
        type="file"
        name="productPicture"
        onChange={handleProductPicture}
      />
    </NewModal>
  );

  const handleCloseProductDetailsModal = () => {
    setProductDetailModal(false);
  };
  const showProductDetailsModal = (product) => {
    setProductDetails(product);
    setProductDetailModal(true);
  };
  const renderProductDetailModal = () => {
    if (!productDetails) return null;
    return (
      <NewModal
        show={productDetailModal}
        handleClose={handleCloseProductDetailsModal}
        modalTitle={`Product Details`}
        size="lg"
      >
        <Row>
          <Col md="6">
            <label className="key">Name</label>
            <p className="value">{productDetails.name}</p>
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <label className="key">Price</label>
            <p className="value">${productDetails.price}</p>
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <label className="key">Quantity</label>
            <p className="value">{productDetails.quantity}</p>
          </Col>
          <Col md="6">
            <label className="key">Category</label>
            <p className="value">{productDetails.category.name}</p>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <label className="key">Description</label>
            <p className="value">
              {productDetails.description ? (
                productDetails.description
              ) : (
                <p>NA</p>
              )}
            </p>
          </Col>
        </Row>
        <Row>
          <Col>
            <label className="key">Product Picture</label>
            <div style={{ display: "flex" }}>
              {productDetails.productPictures.map((picture, index) => {
                return (
                  <div key={index} className="productImgContainer">
                    <img src={generatePublicUrl(picture.img)} alt="" />
                  </div>
                );
              })}
            </div>
          </Col>
        </Row>
      </NewModal>
    );
  };
  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col md={12}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h1>Products</h1>
              <button className="btn btn-info" onClick={handleShow}>
                Add Product
              </button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12}>{renderProducts()}</Col>
        </Row>
      </Container>
      {renderAddProductModal()}
      {renderProductDetailModal()}
    </Layout>
  );
};

export default Products;
