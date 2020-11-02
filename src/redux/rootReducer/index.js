import { combineReducers } from "redux";
import { users } from "../users/users";
import { projects } from "../projects/projects";
import { headerDimension } from "../headerDimension/headerDimension";
import { layers } from "../layers/layers";
import { toolbarDimension } from "../toolbarDimension/toolbarDimension";

export const rootReducer = combineReducers({
  users,
  projects,
  headerDimension,
  layers,
  toolbarDimension,
});
