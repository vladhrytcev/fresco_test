import React from "react";
import Fade from "@material-ui/core/Fade";
import "./PopupSave.scss";

export default function PopupSave({ isShowPopup }) {
  return (
    <div>
      <div>
        <Fade in={isShowPopup}>
          <div className="popup">Saved</div>
        </Fade>
      </div>
    </div>
  );
}
