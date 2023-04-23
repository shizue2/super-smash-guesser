import { saveGuesses } from "../utils/localStorage";

export const GUESSES_REDUCER_ACTIONS = {
  SET_INITIAL_STATE: "SET_INITIAL_STATE",
  ADD_GUESS: "ADD_GUESS",
};

const guessesReducer = (state, action) => {
  switch (action.type) {
    case GUESSES_REDUCER_ACTIONS.SET_INITIAL_STATE:
      return {
        ...state,
        guesses: action.payload.guesses,
        isCorrect: action.payload.isCorrect,
      };
    case GUESSES_REDUCER_ACTIONS.ADD_GUESS: {
      const newGuesses = [...state.guesses, action.payload.guess];
      const newResult = action.payload.isCorrect ? newGuesses.length : -1;
      // Save to localStorage
      const storedHistory = localStorage.getItem("guessesHistory");
      const history = storedHistory ? JSON.parse(storedHistory) : {};
      history[action.payload.todayInt] = {
        guesses: newGuesses,
        result: newResult,
      };
      saveGuesses(history);

      // Return new state
      return {
        ...state,
        guesses: newGuesses,
        isCorrect: action.payload.isCorrect,
      };
    }
    default:
      return state;
  }
};

export default guessesReducer;
