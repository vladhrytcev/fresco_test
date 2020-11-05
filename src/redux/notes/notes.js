const CREATE_NOTE = "CREATE_NOTE";
const CHANGE_POSITION_EMPTY_NOTE = "CHANGE_POSITION_EMPTY_NOTE";
const ADD_TEXT_IN_JUST_CREATED_NOTE = "ADD_TEXT_IN_JUST_CREATED_NOTE";
const CHANGE_POSITION_IN_EXISTING_NOTE = "CHANGE_POSITION_IN_EXISTING_NOTE";
const CHANGE_TEXT_IN_EXISTING_NOTE = "CHANGE_TEXT_IN_EXISTING_NOTE";
const SET_FOCUSED_NOTE_ID = "SET_FOCUSED_NOTE_ID";

export const createNote = (note) => ({
  type: CREATE_NOTE,
  payload: { note },
});

export const changePositionEmptyNote = (coordinates) => ({
  type: CHANGE_POSITION_EMPTY_NOTE,
  payload: { coordinates },
});

export const addTextInJustCreatedNote = (text) => ({
  type: ADD_TEXT_IN_JUST_CREATED_NOTE,
  payload: { text },
});

export const changePositionInExistingNote = (layout) => ({
  type: CHANGE_POSITION_IN_EXISTING_NOTE,
  payload: { layout },
});

export const changeTextInExistingNote = (note) => ({
  type: CHANGE_TEXT_IN_EXISTING_NOTE,
  payload: { note },
});

export const setFocusedNoteId = (noteId) => ({
  type: SET_FOCUSED_NOTE_ID,
  payload: { noteId },
});

const initialState = {
  focusedNoteId: "",
  notesList: [],
};

export const notes = (state = initialState, { type, payload }) => {
  switch (type) {
    case CREATE_NOTE: {
      return {
        ...state,
        notesList: state.notesList.concat(payload.note),
      };
    }
    case CHANGE_POSITION_EMPTY_NOTE: {
      const newNotes = state.notesList.map((note, index, arr) => {
        if (index === arr.length - 1) {
          return {
            ...note,
            x: payload.coordinates.x,
            y: payload.coordinates.y,
          };
        }
        return note;
      });
      return {
        ...state,
        notesList: newNotes,
      };
    }
    case ADD_TEXT_IN_JUST_CREATED_NOTE: {
      const newNotes = state.notesList.map((note, index, arr) => {
        if (index === arr.length - 1) {
          return {
            ...note,
            text: payload.text,
          };
        }
        return note;
      });
      return {
        ...state,
        notesList: newNotes,
      };
    }
    case CHANGE_POSITION_IN_EXISTING_NOTE: {
      const newNotes = state.notesList.map((note) => {
        if (note.noteId === payload.layout.noteId) {
          return {
            ...note,
            x: payload.layout.x,
            y: payload.layout.y,
          };
        }
        return note;
      });
      return {
        ...state,
        notesList: newNotes,
      };
    }
    case CHANGE_TEXT_IN_EXISTING_NOTE: {
      const newNotes = state.notesList.map((note) => {
        if (note.noteId === payload.note.noteId) {
          return {
            ...note,
            text: payload.note.text,
          };
        }
        return note;
      });
      return {
        ...state,
        notesList: newNotes,
      };
    }
    case SET_FOCUSED_NOTE_ID: {
      return {
        ...state,
        focusedNoteId: payload.noteId,
      };
    }
    default: {
      return state;
    }
  }
};
