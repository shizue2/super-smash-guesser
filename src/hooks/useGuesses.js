import rand from "random-seed";
import { useCallback, useEffect, useMemo, useReducer } from "react";
import { CHARACTERS } from "../const/characters";
import guessesReducer, { GUESSES_REDUCER_ACTIONS } from "./guessesReducer";

const getTodaysInt = () => {
  const today = new Date();
  return Math.floor(today / (1000 * 60 * 60 * 24));
};

const initialState = {
  guesses: [],
  isCorrect: false,
};

const useGuesses = () => {
  const todayInt = useMemo(() => getTodaysInt(), []);
  const [state, dispatch] = useReducer(guessesReducer, initialState);
  const { guesses, isCorrect } = state;

  const answer = useMemo(() => {
    const randomGen = rand.create(todayInt.toString());
    const randomInt = Math.floor(randomGen(CHARACTERS.length));
    console.log("correct answer:", CHARACTERS[randomInt]);
    return randomInt;
  }, [todayInt]);

  useEffect(() => {
    dispatch({
      type: GUESSES_REDUCER_ACTIONS.SET_INITIAL_STATE,
      payload: {
        todayInt,
      },
    });
  }, [todayInt]);

  const addGuess = useCallback(
    (guess) => {
      if (guess === undefined) {
        console.error("Invalid Character");
        return;
      }
      dispatch({
        type: GUESSES_REDUCER_ACTIONS.ADD_GUESS,
        payload: {
          guess,
          isCorrect: guess === answer,
          todayInt,
        },
      });
    },
    [answer, todayInt]
  );

  return { answer, guesses, isCorrect, addGuess };
};

export default useGuesses;
