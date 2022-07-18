import React from "react";
import { Col, Row } from "react-bootstrap";
import Input from "../../../components/Ui/Input/Input";
import NewModal from "../../../components/Ui/Modal/NewModal";
const UpdateCategoriesModal = (props) => {
  const {
    size,
    show,
    handleClose,
    modalTitle,
    expandedArray,
    checkArray,
    handleCategoryInput,
    onSubmit,
    categoryList,
  } = props;
  console.log({ expandedArray, checkArray });
  return (
    <NewModal
      show={show}
      handleClose={handleClose}
      modalTitle={modalTitle}
      onSubmit={onSubmit}
      size={size}
    >
      {expandedArray.length > 0 &&
        expandedArray.map((item, index) => (
          <Row key={index}>
            <Col>
              <Input
                value={item.name}
                placeholder={`Category Name`}
                onChange={(e) =>
                  handleCategoryInput("name", e.target.value, index, "expanded")
                }
              />
            </Col>
            <Col>
              <select
                className="form-control"
                value={item.parentId}
                onChange={(e) =>
                  handleCategoryInput(
                    "parentId",
                    e.target.value,
                    index,
                    "expanded"
                  )
                }
              >
                <option>Select Category</option>
                {categoryList.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.name}
                  </option>
                ))}
              </select>
            </Col>
            <Col>
              <select
                className="form-control"
                value={item.type}
                onChange={(e) =>
                  handleCategoryInput("type", e.target.value, index, "expanded")
                }
              >
                <option value="">Select type</option>
                <option value="store">Store</option>
                <option value="product">Product</option>
                <option value="page">Page</option>
              </select>
            </Col>
          </Row>
        ))}
      {checkArray.length > 0 &&
        checkArray.map((item, index) => (
          <Row key={index}>
            <Col>
              <Input
                value={item.name}
                placeholder={`Category Name`}
                onChange={(e) =>
                  handleCategoryInput("name", e.target.value, index, "checked")
                }
              />
            </Col>
            <Col>
              <select
                className="form-control"
                value={item.parentId}
                onChange={(e) =>
                  handleCategoryInput(
                    "parentId",
                    e.target.value,
                    index,
                    "checked"
                  )
                }
              >
                <option>Select Category</option>
                {categoryList.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.name}
                  </option>
                ))}
              </select>
            </Col>
            <Col>
              <select
                className="form-control"
                value={item.type}
                onChange={(e) =>
                  handleCategoryInput("type", e.target.value, index, "checked")
                }
              >
                <option value="">Select type</option>
                <option value="store">Store</option>
                <option value="product">Product</option>
                <option value="page">Page</option>
              </select>
            </Col>
          </Row>
        ))}
    </NewModal>
  );
};

export default UpdateCategoriesModal;
