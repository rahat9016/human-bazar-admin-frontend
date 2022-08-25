import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addCategory,
  getAllCategory,
  updateCategories,
  deleteCategories as deleteCategoriesAction,
} from "../../action/category.action";
import Layout from "../../components/Layout";
import NewModal from "../../components/Ui/Modal/NewModal";
import CheckboxTree from "react-checkbox-tree";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import {
  IoIosCheckboxOutline,
  IoIosCheckbox,
  IoIosArrowForward,
  IoIosArrowDown,
} from "react-icons/io";
import UpdateCategoriesModal from "./components/UpdateCategoriesModal";
import AddCategoryModal from "./components/AddCategoryModal";
import "./style.css";
const Category = () => {
  const [show, setShow] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [parentCategoryId, setParentCategoryId] = useState("");
  const [categoryImage, setCategoryImage] = useState("");
  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const [checkArray, setCheckArray] = useState([]);
  const [expandedArray, setExpandedArray] = useState([]);
  const [updateCategoryModal, setUpdateCategoryModal] = useState(false);
  const [deleteCategoryModal, setDeleteCategoryModal] = useState(false);
  const handleShow = () => setShow(true);
  const category = useSelector((state) => state.category);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!category.loading) {
      setShow(false);
    }
  }, [category.loading]);
  const handleClose = () => {
    const form = new FormData();
    if (categoryName === "") {
      alert("Category name is required");
      setShow(false);
      return;
    }
    form.append("name", categoryName);
    form.append("parentId", parentCategoryId);
    form.append("categoryImage", categoryImage);
    dispatch(addCategory(form)).then(() => {
      dispatch(getAllCategory());
    });
    setCategoryName("");
    setParentCategoryId("");
    setShow(false);
  };

  //Render Categories
  const renderCategories = (categories) => {
    let myCategories = [];
    for (let category of categories) {
      myCategories.push({
        label: category.name,
        value: category._id,
        children:
          category.children.length > 0 && renderCategories(category.children),
      });
    }
    return myCategories;
  };
  //Create category list
  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({
        value: category._id,
        name: category.name,
        parentId: category.parentId,
        type: category.type,
      });
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }
    return options;
  };
  const handleCategoryImage = (e) => {
    setCategoryImage(e.target.files[0]);
  };
  //Edit category
  const updateCategory = () => {
    updateCheckedAndExpandedCategories();
    setUpdateCategoryModal(true);
  };
  const updateCheckedAndExpandedCategories = () => {
    const checkArray = [];
    const expandedArray = [];
    const categories = createCategoryList(category.categories);
    checked.length > 0 &&
      checked.forEach((categoryId, index) => {
        const category = categories.find(
          (category, _index) => categoryId === category.value
        );
        category && checkArray.push(category);
      });
    expanded.length > 0 &&
      expanded.forEach((categoryId, index) => {
        const category = categories.find(
          (category, _index) => categoryId === category.value
        );
        category && expandedArray.push(category);
      });
    setExpandedArray(expandedArray);
    setCheckArray(checkArray);
  };
  const handleCategoryInput = (key, value, index, type) => {
    if (type === "checked") {
      const updatedCheckArray = checkArray.map((item, _index) =>
        index === _index ? { ...item, [key]: value } : item
      );
      setCheckArray(updatedCheckArray);
    } else if (type === "expanded") {
      const updatedExpandedArray = expandedArray.map((item, _index) =>
        index === _index ? { ...item, [key]: value } : item
      );
      setExpandedArray(updatedExpandedArray);
    }
  };
  const updateCategoriesForm = () => {
    const form = new FormData();
    expandedArray.forEach((item, index) => {
      form.append("_id", item.value);
      form.append("name", item.name);
      form.append("parentId", item.parentId ? item.parentId : "");
      form.append("type", item.type);
    });
    checkArray.forEach((item, index) => {
      form.append("_id", item.value);
      form.append("name", item.name);
      form.append("parentId", item.parentId ? item.parentId : "");
      form.append("type", item.type);
    });
    dispatch(updateCategories(form));
    setUpdateCategoryModal(false);
  };

  const deleteCategory = () => {
    updateCheckedAndExpandedCategories();
    setDeleteCategoryModal(true);
  };
  const deleteCategories = () => {
    const checkedIdsArray = checkArray.map((item, index) => ({
      _id: item.value,
    }));
    const expandedIdsArray = expandedArray.map((item, index) => ({
      _id: item.value,
    }));

    const idsArray = expandedIdsArray.concat(checkedIdsArray);
    if (checkedIdsArray.length > 0) {
      dispatch(deleteCategoriesAction(checkedIdsArray)).then((result) => {
        if (result) {
          dispatch(getAllCategory());
        }
      });
      setDeleteCategoryModal(false);
    }
  };
  const renderDeleteCategoryModal = () => {
    return (
      <NewModal
        modalTitle="Confirm "
        show={deleteCategoryModal}
        handleClose={() => setDeleteCategoryModal(false)}
        buttons={[
          {
            label: "No",
            color: "primary",
            onClick: () => {
              alert("no");
            },
          },
          {
            label: "Yes",
            color: "danger",
            onClick: deleteCategories,
          },
        ]}
      >
        <h4>Expanded</h4>
        {expandedArray.map((item, index) => (
          <span key={index}>{item.name}</span>
        ))}
        <h4>Checked</h4>
        {checkArray.map((item, index) => (
          <span key={index}>{item.name}</span>
        ))}
      </NewModal>
    );
  };
  const categoryList = createCategoryList(category.categories);
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
              {/* <ul>
                {renderCategories(category.categories)}
                {JSON.stringify(createCategoryList(category.categories))}
              </ul> */}
              <CheckboxTree
                nodes={renderCategories(category.categories)}
                checked={checked}
                expanded={expanded}
                onCheck={(checked) => setChecked(checked)}
                onExpand={(expanded) => setExpanded(expanded)}
                icons={{
                  check: <IoIosCheckbox />,
                  uncheck: <IoIosCheckboxOutline />,
                  halfCheck: <IoIosCheckboxOutline />,
                  expandClose: <IoIosArrowForward />,
                  expandOpen: <IoIosArrowDown />,
                }}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <button onClick={deleteCategory}>Delete</button>
              <button onClick={updateCategory}>Edit</button>
            </Col>
          </Row>
        </Container>
        <AddCategoryModal
          show={show}
          handleClose={() => setShow(false)}
          onSubmit={handleClose}
          modalTitle="Add New Category"
          handleCategoryImage={handleCategoryImage}
          setCategoryName={setCategoryName}
          categoryName={categoryName}
          parentCategoryId={parentCategoryId}
          setParentCategoryId={setParentCategoryId}
          categoryList={categoryList}
        />
        <UpdateCategoriesModal
          show={updateCategoryModal}
          handleClose={() => setUpdateCategoryModal(false)}
          onSubmit={updateCategoriesForm}
          modalTitle={`Update Categories`}
          size="lg"
          expandedArray={expandedArray}
          checkArray={checkArray}
          handleCategoryInput={handleCategoryInput}
          categoryList={categoryList}
        />
        {renderDeleteCategoryModal()}
      </Layout>
    </div>
  );
};

export default Category;
