import React, { useState } from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import HeaderTemplate from "../../layouts/HeaderTemplate";
import ProjectCreateModal from "../ProjectCreateModal";
import ProjectCard from "../ProjectCard";
import "./ProjectsPanel.scss";

const ProjectsPanel = ({ projects, createProject, setActiveProject }) => {
  const [isShowModal, setIsShowModal] = useState(false);
  const openModal = () => setIsShowModal(true);
  const closeModal = () => setIsShowModal(false);

  const conditionShowProjectsList = projects.projectsList.length > 0;

  return (
    <HeaderTemplate>
      <div className="projects">
        <div className="container">
          <div className="projects__inner">
            <div className="projects__add">
              <button className="projects__plus" onClick={openModal}>
                <FontAwesomeIcon
                  size="lg"
                  icon={faPlus}
                  className="projects__icon"
                />
              </button>
              <p className="projects__label">Add new project</p>
            </div>
            {conditionShowProjectsList &&
              projects.projectsList.map((project) => (
                <ProjectCard
                  project={project}
                  key={project.projectId}
                  setActiveProject={setActiveProject}
                />
              ))}
          </div>
        </div>
        <ProjectCreateModal
          closeModal={closeModal}
          isShowModal={isShowModal}
          createProject={createProject}
        />
      </div>
    </HeaderTemplate>
  );
};

const mapStateToProps = (state) => ({
  projects: state.projects,
});

export default connect(mapStateToProps)(ProjectsPanel);
