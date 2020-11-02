import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import { signIn } from "../../redux/users/users";
import { createProject, setActiveProject } from "../../redux/projects/projects";
import { setToolbarDimension } from "../../redux/toolbarDimension/toolbarDimension";
import { saveLayer } from "../../redux/layers/layers";
import SignIn from "../SignIn";
import ProjectsPanel from "../ProjectsPanel";
import Workspace from "../Workspace";
import * as ROUTES from "../../constants/routes";

const App = ({ actions }) => (
  <BrowserRouter>
    <Route
      exact
      path={ROUTES.SIGN_IN}
      render={() => <SignIn signIn={actions.signIn} />}
    />
    <Route
      path={ROUTES.PROJECTS_PANEL}
      render={() => (
        <ProjectsPanel
          createProject={actions.createProject}
          setActiveProject={actions.setActiveProject}
        />
      )}
    />
    <Route
      path={ROUTES.WORKSPACE}
      component={() => (
        <Workspace
          saveLayer={actions.saveLayer}
          setToolbarDimension={actions.setToolbarDimension}
        />
      )}
    />
  </BrowserRouter>
);

const mapDispatchToProps = (dispatch) => ({
  actions: {
    signIn: (user) => dispatch(signIn(user)),
    createProject: (project) => dispatch(createProject(project)),
    setActiveProject: (project) => dispatch(setActiveProject(project)),
    setToolbarDimension: (dimension) =>
      dispatch(setToolbarDimension(dimension)),
    saveLayer: (layer) => dispatch(saveLayer(layer)),
  },
});

export default connect(null, mapDispatchToProps)(App);
