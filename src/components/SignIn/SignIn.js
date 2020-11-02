import React from "react";
import { v4 as uuidv4 } from "uuid";
import { useHistory } from "react-router-dom";
import { uniqueNamesGenerator, names } from "unique-names-generator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserAlt } from "@fortawesome/free-solid-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import HeaderTemplate from "../../layouts/HeaderTemplate";
import * as ROUTES from "../../constants/routes";
import "./SignIn.scss";

const SignIn = ({ signIn }) => {
  const history = useHistory();

  const configDictionaries = {
    dictionaries: [names],
  };

  const logIn = () => {
    const user = {
      userName: uniqueNamesGenerator(configDictionaries),
      userId: uuidv4(),
    };
    signIn(user);
    history.push(ROUTES.PROJECTS_PANEL);
  };

  return (
    <>
      <HeaderTemplate>
        <div className="signin">
          <div className="signin__label">
            <FontAwesomeIcon
              size="lg"
              icon={faUserAlt}
              className="signin__sticker"
            />
          </div>
          <div className="signin__content">
            <p className="signin__text">Sign in with</p>
            <button className="signin__btn" onClick={logIn}>
              <FontAwesomeIcon
                size="lg"
                icon={faGoogle}
                className="signin__icon"
              />
            </button>
          </div>
        </div>
      </HeaderTemplate>
    </>
  );
};

export default SignIn;
