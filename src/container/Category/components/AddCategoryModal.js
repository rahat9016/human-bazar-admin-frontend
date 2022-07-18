import React from "react";
import { Col, Row } from "react-bootstrap";
import Input from "../../../components/Ui/Input/Input";
import NewModal from "../../../components/Ui/Modal/NewModal";

const AddCategoryModal = (props) => {
  const {
    show,
    handleClose,
    modalTitle,
    categoryName,
    setCategoryName,
    parentCategoryId,
    setParentCategoryId,
    categoryList,
    handleCategoryImage,
    onSubmit,
  } = props;
  return (
    <NewModal
      show={show}
      handleClose={handleClose}
      modalTitle={modalTitle}
      onSubmit={onSubmit}
    >
      <Row>
        <Col>
          <Input
            value={categoryName}
            placeholder={`Category Name`}
            onChange={(e) => setCategoryName(e.target.value)}
            className="form-control-sm"
          />
        </Col>
        <Col>
          <select
            className="form-control"
            value={parentCategoryId}
            onChange={(e) => setParentCategoryId(e.target.value)}
          >
            <option>Select Category</option>
            {categoryList.map((category) => (
              <option key={category.value} value={category.value}>
                {category.name}
              </option>
            ))}
          </select>
        </Col>
      </Row>
      <Row>
        <Col>
          <input
            type="file"
            name="categoryImage"
            className="form-control"
            onChange={handleCategoryImage}
          />
        </Col>
      </Row>
    </NewModal>
  );
};

export default AddCategoryModal;
