import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createPage } from "../../action/page.action";
import Layout from "../../components/Layout";
import Input from "../../components/Ui/Input/Input";
import NewModal from "../../components/Ui/Modal/NewModal";
import linearCategories from "../../helpers/linearCategories";
const Page = () => {
  const [createModal, setCreateModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [type, setType] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [banners, setBanners] = useState([]);
  const [products, setProducts] = useState([]);
  const category = useSelector((state) => state.category);
  const page = useSelector((state) => state.page);
  const dispatch = useDispatch();
  console.log(page);
  //   Render Categories
  useEffect(() => {
    setCategories(linearCategories(category.categories));
  }, [category]);
  //Render Pages
  useEffect(() => {
    if (!page.loading) {
      setCreateModal(false);
      setTitle("");
      setDesc("");
      setType("");
      setCategoryId("");
      setBanners([]);
      setProducts([]);
    }
  }, [page]);
  const onCategoryChange = (e) => {
    const category = categories.find(
      (category) => category.value === e.target.value
    );
    setCategoryId(e.target.value);
    setType(category.type);
  };
  const handleBannersImage = (e) => {
    setBanners([...banners, e.target.files[0]]);
  };
  const handleProductsImage = (e) => {
    setProducts([...products, e.target.files[0]]);
  };
  const submitPageForm = (e) => {
    // e.preventDefault();
    if (title === "") {
      alert("Title is required!");
      setCreateModal(false);
      return;
    }
    const form = new FormData();
    form.append("title", title);
    form.append("description", desc);
    form.append("category", categoryId);
    form.append("type", type);
    banners.forEach((banner, index) => {
      form.append("banners", banner);
    });
    products.forEach((product, index) => {
      form.append("products", product);
    });
    dispatch(createPage(form));
  };
  const renderCreatePageModal = () => {
    return (
      <NewModal
        show={createModal}
        modalTitle={"Create new page"}
        handleClose={() => setCreateModal(false)}
        onSubmit={submitPageForm}
      >
        <Container>
          <Row>
            <Col>
              {/* <select
                className="form-control"
                value={categoryId}
                onChange={onCategoryChange}
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat.value}>
                    {cat.name}
                  </option>
                ))}
              </select> */}
              <Input
                placeholder="Select Category"
                type="select"
                value={categoryId}
                onChange={onCategoryChange}
                options={categories}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Input
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Page Title"
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Input
                className="form-control"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder="Page Description"
              />
            </Col>
          </Row>
          <Row>
            {banners.length > 0
              ? banners.map((banners, index) => (
                  <Row key={index}>
                    <Col>{banners.name}</Col>
                  </Row>
                ))
              : null}
            <Col>
              <input
                className="form-control"
                type="file"
                name="banners"
                onChange={handleBannersImage}
              />
            </Col>
          </Row>
          <Row>
            {products.length > 0
              ? products.map((products, index) => (
                  <Row key={index}>
                    <Col>{products.name}</Col>
                  </Row>
                ))
              : null}
            <Col>
              <input
                className="form-control"
                type="file"
                name="products"
                onChange={handleProductsImage}
              />
            </Col>
          </Row>
        </Container>
      </NewModal>
    );
  };
  return (
    <Layout sidebar>
      {page.loading ? (
        <p>Create page... Please wait</p>
      ) : (
        <>
          {renderCreatePageModal()}
          <button onClick={() => setCreateModal(true)}>Create Page</button>
        </>
      )}
    </Layout>
  );
};

export default Page;
