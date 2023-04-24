import "./App.css";
import CharacterSelection from "./components/CharacterSelection";
import { Grid } from "./components/Grid";
import { CHARACTERS } from "./const/characters";
import { NUM_ATTEMPS } from "./const/settings";
import useGuesses from "./hooks/useGuesses";

function App() {
  const { answer, guesses, isCorrect, addGuess } = useGuesses();
  return (
    <div className="App">
      <header className="App-header">
        <div className="row" style={{ gap: 12 }}>
          <p>Smashle</p>
          <HistoryStatistics history={history}/>
        </div>
      </header>
      <div className="App-body">
        <Grid answer={answer} guesses={guesses} />
        <CharacterSelection
          isCorrect={isCorrect}
          guesses={guesses}
          addGuess={addGuess}
        />
        {isCorrect ? (
          <div className="correct_answer">Congrats!</div>
        ) : guesses.length >= NUM_ATTEMPS ? (
          <div className="wrong_answer">
            Sorry, the correct answer was {CHARACTERS[answer]?.name}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default App;
