import { Button, Select } from "antd";
import { useMemo, useState } from "react";
import "./App.css";
import { Grid } from "./components/Grid";
import {
  ATTRIBUTES
} from "./const/attributes";
import { CHARACTERS } from "./const/characters";
import { NUM_ATTEMPS } from "./const/settings";

function App() {


  const [isCorrect, setIsCorrect] = useState(false);
  const [guesses, setGuesses] = useState([]);
  const [selection, setSelection] = useState();
  const answer = useMemo(() => {
    const randomInt = Math.floor(Math.random() * CHARACTERS.length);
    console.log("correct answer:", CHARACTERS[randomInt]);
    return randomInt;
  }, []);

  function handleGuess() {
    if (selection == undefined) {
      console.error("Invalid Character")
      return
    };
    setGuesses((prev) => {
      return [...prev, { selectionIndex: selection }];
    });
    if (selection == answer) {
      setIsCorrect(true);
    } else if (guesses.length + 1 >= NUM_ATTEMPS) setIsCorrect(false);
  }



  return (
    <div className="App">
      <header className="App-header">
        <p>Smashle</p>
      </header>
      <div className="App-body">


        <Grid answer={answer} guesses={guesses} />
        <div className="row">
          <Select
            showSearch
            onChange={setSelection}
            style={{ width: 240 }}
            filterOption={(input, option) => {
              console.log({ input, option });
              return (option?.label ?? "")
                .toLowerCase()
                .includes(input.toLowerCase());
            }}
            optionLabelProp="label"
          >
            {CHARACTERS.map((character, i) => {
              const imageUrl = `${process.env.PUBLIC_URL}${character.image_url}`;
              return (
                <Select.Option key={i} value={i} label={character[ATTRIBUTES.NAME]}>
                  <div className="character-option">
                    <img src={imageUrl} className="character-image" alt={character[ATTRIBUTES.NAME]} />
                    <span className="character-name">{character[ATTRIBUTES.NAME]}</span>
                  </div>
                </Select.Option>
              );
            })}
          </Select>

          <Button type="primary" onClick={handleGuess} disabled={isCorrect || guesses.length >= NUM_ATTEMPS || selection == undefined}>
            Make Guess
          </Button>
        </div>
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
