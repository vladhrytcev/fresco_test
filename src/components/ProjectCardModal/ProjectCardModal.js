import React from "react";
import "./ProjectCardModal.scss";

const ProjectCardModal = ({ project, closeModal, isShowModal }) => {
  const handleModalContentClick = (event) => event.stopPropagation();

  return (
    <>
      {isShowModal && (
        <div className="detail" onClick={closeModal}>
          <div className="detail__content" onClick={handleModalContentClick}>
            <h3 className="detail__title">{project.projectTitle}</h3>
            <p className="detail__description">{project.projectDescription}</p>
            <button className="detail__btn" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectCardModal;
