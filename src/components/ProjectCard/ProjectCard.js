import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { setCurrentTool } from "../../redux/tools/tools";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faFileAlt } from "@fortawesome/free-solid-svg-icons";
import ProjectCardModal from "../ProjectCardModal";
import { toolsList } from "../../constants/toolsList";
import * as ROUTES from "../../constants/routes";
import "./ProjectCard.scss";

const ProjectCard = ({ project, setActiveProject, actions }) => {
  const history = useHistory();

  const [isShowModal, setIsShowModal] = useState(false);
  const openModal = () => setIsShowModal(true);
  const closeModal = () => setIsShowModal(false);

  const handleClick = () => {
    setActiveProject(project);
    actions.setCurrentTool(toolsList.default);
    history.push(ROUTES.DASHBOARD);
  };

  return (
    <>
      <div className="card">
        <h3 className="card__title">{project.projectTitle}</h3>
        <p className="card__description">{project.projectDescription}</p>
        <div className="card__group">
          <button className="card__btn" onClick={openModal}>
            <FontAwesomeIcon
              size="lg"
              icon={faFileAlt}
              className="card__icon"
            />
          </button>
          <button className="card__btn" onClick={handleClick}>
            <FontAwesomeIcon size="lg" icon={faEdit} className="card__icon" />
          </button>
        </div>
      </div>
      <ProjectCardModal
        project={project}
        closeModal={closeModal}
        isShowModal={isShowModal}
      />
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  actions: {
    setCurrentTool: (tool) => dispatch(setCurrentTool(tool)),
  },
});

export default connect(null, mapDispatchToProps)(ProjectCard);
