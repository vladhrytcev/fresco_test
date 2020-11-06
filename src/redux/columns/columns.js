const SET_COLUMNS = "SET_COLUMNS";
const CHANGE_TEXT_IN_COLUMN = "CHANGE_TEXT_IN_COLUMN";
const CHANGE_POSITION_COLUMN = "CHANGE_POSITION_IN_COLUMN";
const SET_MOVED_COLUMN_ID = "SET_MOVED_COLUMN_ID";
const RESET_COLUMNS = "RESET_COLUMNS";

export const setColumns = (columns) => ({
  type: SET_COLUMNS,
  payload: { columns },
});

export const changeTextInColumn = (column) => ({
  type: CHANGE_TEXT_IN_COLUMN,
  payload: { column },
});

export const changePositionColumn = (column) => ({
  type: CHANGE_POSITION_COLUMN,
  payload: { column },
});

export const setMovedColumnId = (columnId) => ({
  type: SET_MOVED_COLUMN_ID,
  payload: { columnId },
});

export const resetColumns = (column) => ({
  type: RESET_COLUMNS,
  payload: { column },
});

const initialState = {
  movedColumnId: "",
  columnsList: {
    digitalPolicyModelCanvas: {
      columnsInitialLayout: [],
      columnsArray: [],
    },
  },
};

export const columns = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_COLUMNS: {
      const findingColumns = state.columnsList.digitalPolicyModelCanvas.columnsArray.find(
        (col) =>
          col.userId === payload.columns.userId &&
          col.projectId === payload.columns.projectId
      );
      return {
        ...state,
        columnsList: {
          ...state.columnsList,
          digitalPolicyModelCanvas: {
            ...state.digitalPolicyModelCanvas,
            columnsInitialLayout: payload.columns.columns,
            columnsArray: !findingColumns
              ? state.columnsList.digitalPolicyModelCanvas.columnsArray.concat(
                  payload.columns
                )
              : state.columnsList.digitalPolicyModelCanvas.columnsArray,
          },
        },
      };
    }
    case CHANGE_TEXT_IN_COLUMN: {
      const findingColumns = state.columnsList.digitalPolicyModelCanvas.columnsArray.find(
        (col) =>
          col.userId === payload.column.userId &&
          col.projectId === payload.column.projectId
      );

      const newColumns = findingColumns.columns.map((col) => {
        if (col.id === payload.column.columnId) {
          return { ...col, title: payload.column.title };
        }
        return col;
      });

      const newColumnsArray = state.columnsList.digitalPolicyModelCanvas.columnsArray.map(
        (col) => {
          if (
            col.userId === payload.column.userId &&
            col.projectId === payload.column.projectId
          ) {
            return { ...col, columns: newColumns };
          }
          return col;
        }
      );

      return {
        ...state,
        columnsList: {
          ...state.columnsList,
          digitalPolicyModelCanvas: {
            ...state.columnsList.digitalPolicyModelCanvas,
            columnsArray: newColumnsArray,
          },
        },
      };
    }
    case CHANGE_POSITION_COLUMN: {
      const findingColumns = state.columnsList.digitalPolicyModelCanvas.columnsArray.find(
        (col) =>
          col.userId === payload.column.userId &&
          col.projectId === payload.column.projectId
      );

      const newColumns = findingColumns.columns.map((col) => {
        if (col.id === payload.column.columnId) {
          return {
            ...col,
            columnX: payload.column.x,
            columnY: payload.column.y,
            titleX: payload.column.x + 10,
            titleY: payload.column.y + 10,
          };
        }
        return col;
      });

      const newColumnsArray = state.columnsList.digitalPolicyModelCanvas.columnsArray.map(
        (col) => {
          if (
            col.userId === payload.column.userId &&
            col.projectId === payload.column.projectId
          ) {
            return { ...col, columns: newColumns };
          }
          return col;
        }
      );

      return {
        ...state,
        columnsList: {
          ...state.columnsList,
          digitalPolicyModelCanvas: {
            ...state.columnsList.digitalPolicyModelCanvas,
            columnsArray: newColumnsArray,
          },
        },
      };
    }
    case SET_MOVED_COLUMN_ID: {
      return {
        ...state,
        movedColumnId: payload.columnId,
      };
    }
    case RESET_COLUMNS: {
      const newColumnsArray = state.columnsList.digitalPolicyModelCanvas.columnsArray.map(
        (col) => {
          if (
            col.userId === payload.column.userId &&
            col.projectId === payload.column.projectId
          ) {
            return {
              ...col,
              columns:
                state.columnsList.digitalPolicyModelCanvas.columnsInitialLayout,
            };
          }
          return col;
        }
      );

      return {
        ...state,
        columnsList: {
          ...state.columnsList,
          digitalPolicyModelCanvas: {
            ...state.columnsList.digitalPolicyModelCanvas,
            columnsArray: newColumnsArray,
          },
        },
      };
    }
    default: {
      return state;
    }
  }
};
