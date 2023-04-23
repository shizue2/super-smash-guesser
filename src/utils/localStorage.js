export const getTodaysGuesses = (todayInt, history) => {
  return history[todayInt]?.guesses || [];
};

export const getTodaysResult = (todayInt, history) => {
  return history[todayInt]?.result || -1;
};

export const saveGuesses = (history) => {
  localStorage.setItem("guessesHistory", JSON.stringify(history));
};
