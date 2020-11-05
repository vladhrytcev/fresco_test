import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withResizeDetector } from "react-resize-detector";
import { setHeaderDimension } from "../../redux/dimensions/dimensions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserAlt } from "@fortawesome/free-solid-svg-icons";
import { faChalkboard } from "@fortawesome/free-solid-svg-icons";
import "./Header.scss";

const Header = ({ users, height, actions }) => {
  const conditionShowUser = Object.keys(users.currentUser).length > 0;
  const headerHeight = Math.floor(height);

  useEffect(() => {
    if (!!headerHeight) {
      actions.setHeaderDimension({
        height: headerHeight,
      });
    }
  }, [actions, headerHeight]);

  return (
    <header className="header">
      <div className="container">
        <div className="header__inner">
          <div className="header__logo">
            <div className="logo__symbol">
              <FontAwesomeIcon
                size="lg"
                icon={faChalkboard}
                className="header__icon  header__icon--chalkboard"
              />
            </div>
            <div className="logo__letter">Fresco</div>
          </div>
          {conditionShowUser && (
            <div className="header__profile">
              <div className="header__user">{users.currentUser.userName}</div>
              <FontAwesomeIcon
                size="lg"
                icon={faUserAlt}
                className="header__icon"
              />
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

const mapStateToProps = (state) => ({
  users: state.users,
});

const mapDispatchToProps = (dispatch) => ({
  actions: {
    setHeaderDimension: (dimension) => dispatch(setHeaderDimension(dimension)),
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withResizeDetector(Header));
