import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import {
  createNote,
  setFocusedNoteId,
  changePositionEmptyNote,
  addTextInJustCreatedNote,
} from "../../redux/notes/notes";
import { saveLayer } from "../../redux/layers/layers";
import { setColumns } from "../../redux/columns/columns";
import HeaderTemplate from "../../layouts/HeaderTemplate";
import CanvasContainer from "../CanvasContainer";
import Toolbar from "../Toolbar";
import Konva from "konva";
import "./Dashboard.scss";

const Dashboard = ({ users, layers, actions, projects }) => {
  const stageRef = useRef(null);
  const gridLayerRef = useRef(null);
  const drawLayerRef = useRef(null);
  const customGridLayerRef = useRef(null);

  const [isShowPopup, setIsShowPopup] = useState(false);

  const toggleShowingSavePopup = () => {
    setIsShowPopup(true);
    setTimeout(() => setIsShowPopup(false), 1000);
  };

  const saveCanvas = () => {
    const layer = {
      projectId: projects.currentProject.projectId,
      userId: users.currentUser.userId,
      drawLayer: stageRef.current.children[1].toJSON(),
    };
    actions.saveLayer(layer);
  };

  useEffect(() => {
    if (layers.length === 0) return;
    const findingLayer = layers.find(
      (layer) =>
        layer.userId === users.currentUser.userId &&
        layer.projectId === projects.currentProject.projectId
    );

    if (!findingLayer) return;
    const drawLayer = Konva.Node.create(findingLayer.drawLayer);
    drawLayerRef.current.destroy();
    stageRef.current.add(drawLayer);
  }, []); //eslint-disable-line

  return (
    <HeaderTemplate>
      <div className="dashboard">
        <Toolbar
          isShowPopup={isShowPopup}
          toggleShowingSavePopup={toggleShowingSavePopup}
          saveCanvas={saveCanvas}
        />
        <CanvasContainer
          drawLayerRef={drawLayerRef}
          gridLayerRef={gridLayerRef}
          stageRef={stageRef}
          customGridLayerRef={customGridLayerRef}
        />
      </div>
    </HeaderTemplate>
  );
};

const mapStateToProps = (state) => ({
  users: state.users,
  projects: state.projects,
  layers: state.layers,
});

const mapDispatchToProps = (dispatch) => ({
  actions: {
    createNote: (notes) => dispatch(createNote(notes)),
    changePositionEmptyNote: (coordinates) =>
      dispatch(changePositionEmptyNote(coordinates)),
    addTextInJustCreatedNote: (text) =>
      dispatch(addTextInJustCreatedNote(text)),
    setFocusedNoteId: (noteId) => dispatch(setFocusedNoteId(noteId)),
    saveLayer: (layer) => dispatch(saveLayer(layer)),
    setColumns: (columns) => dispatch(setColumns(columns)),
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
