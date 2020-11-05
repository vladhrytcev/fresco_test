import { combineReducers } from "redux";
import { users } from "../users/users";
import { notes } from "../notes/notes";
import { layers } from "../layers/layers";
import { projects } from "../projects/projects";
import { tools } from "../tools/tools";
import { rectangles } from "../rectangles/rectangles";
import { columns } from "../columns/columns";
import { dimensions } from "../dimensions/dimensions";

export const rootReducer = combineReducers({
  users,
  projects,
  layers,
  notes,
  tools,
  rectangles,
  columns,
  dimensions,
});
