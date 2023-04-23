export const getTodaysGuesses = (todayInt, history) => {
  return history[todayInt]?.guesses || [];
};

export const getTodaysScore = (todayInt, history) => {
  return history[todayInt]?.score || -1;
};

export const saveGuesses = (history) => {
  localStorage.setItem("guessesHistory", JSON.stringify(history));
};
