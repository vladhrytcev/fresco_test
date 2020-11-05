import React, { useState } from "react";
import { connect } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import "./ProjectCreateModal.scss";

const ProjectCreateModal = ({
  users,
  closeModal,
  isShowModal,
  createProject,
}) => {
  const [fieldValues, setFieldValues] = useState({
    projectTitle: "",
    projectDescription: "",
    projectTemplate: "Custom",
  });

  const handleChange = (prop) => ({ target }) => {
    setFieldValues({
      ...fieldValues,
      [prop]: target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newProject = {
      projectDescription: fieldValues.projectDescription,
      projectTitle: fieldValues.projectTitle,
      projectTemplate: fieldValues.projectTemplate,
      userId: users.currentUser.userId,
      projectId: uuidv4(),
    };

    createProject(newProject);
    closeModal();
    setFieldValues({
      projectTitle: "",
      projectDescription: "",
    });
  };

  const handleModalContentClick = (event) => event.stopPropagation();

  return (
    <>
      {isShowModal && (
        <div className="modal" onClick={closeModal}>
          <div className="modal__content" onClick={handleModalContentClick}>
            <FontAwesomeIcon
              size="lg"
              icon={faTimes}
              onClick={closeModal}
              className="modal__icon"
            />
            <h3 className="modal__title">Create project</h3>
            <form className="modal__form" onSubmit={handleSubmit}>
              <div className="modal__inner">
                <div className="modal__block">
                  <div className="modal__group">
                    <label className="modal__label" htmlFor="project-title">
                      Title
                    </label>
                    <input
                      id="project-title"
                      type="text"
                      className="modal__field"
                      placeholder="Enter title"
                      value={fieldValues.projectTitle}
                      onChange={handleChange("projectTitle")}
                    />
                  </div>
                  <div className="modal__group">
                    <label className="modal__label" htmlFor="project-template">
                      Template
                    </label>
                    <select
                      className="modal__field  modal__field--select"
                      id="project-template"
                      onChange={handleChange("projectTemplate")}
                    >
                      <option className="modal__option">Custom</option>
                      <option className="modal__option">
                        Digital Policy Model Canvas
                      </option>
                    </select>
                  </div>
                </div>
                <div className="modal__block">
                  <div className="modal__group">
                    <label
                      className="modal__label"
                      htmlFor="project-description"
                    >
                      Description
                    </label>
                    <textarea
                      id="project-description"
                      className="modal__field  modal__field--textarea"
                      placeholder="Enter description"
                      value={fieldValues.projectDescription}
                      onChange={handleChange("projectDescription")}
                    />
                  </div>
                </div>
              </div>
              <button className="modal__btn" type="submit">
                Create project
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  users: state.users,
});

export default connect(mapStateToProps)(ProjectCreateModal);
