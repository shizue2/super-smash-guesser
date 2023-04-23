import { useReducer, useEffect, useCallback, useMemo } from "react";
import { CHARACTERS } from "../const/characters";
import rand from "random-seed";
import guessesReducer, { GUESSES_REDUCER_ACTIONS } from "./guessesReducer";
import { getTodaysResult, getTodaysGuesses } from "../utils/localStorage";

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
    const storedHistory = localStorage.getItem("guessesHistory");
    const history = storedHistory ? JSON.parse(storedHistory) : {};

    dispatch({
      type: GUESSES_REDUCER_ACTIONS.SET_INITIAL_STATE,
      payload: {
        guesses: getTodaysGuesses(todayInt, history),
        isCorrect: getTodaysResult(todayInt, history) > 0,
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
