import { useMemo, useState } from "react";
import "./App.css";
import {
  ATTRIBUTES,
  ATTRIBUTE_INDEX,
  ATTRIBUTE_LABELS,
} from "./const/attributes";
import { CHARACTERS } from "./const/characters";
import { NUM_ATTEMPS } from "./const/settings";
import { Select, Space, Button } from "antd";

function App() {
  const rows = Array.from(Array(NUM_ATTEMPS).keys());
  const cols = Array.from(Array(Object.keys(ATTRIBUTES).length).keys());

  const [isCorrect, setIsCorrect] = useState(false);
  const [guesses, setGuesses] = useState([]);
  const [selection, setSelection] = useState(0);
  const answer = useMemo(() => {
    const randomInt = Math.floor(Math.random() * CHARACTERS.length);
    console.log("correct answer:", CHARACTERS[randomInt]);
    return randomInt;
  }, []);

  function handleGuess() {
    setGuesses((prev) => {
      return [...prev, { selectionIndex: selection }];
    });
    if (selection == answer) {
      setIsCorrect(true);
    } else if (guesses.length + 1 >= NUM_ATTEMPS) setIsCorrect(false);
  }

  function release_year_comparison(year) {
    if (year < CHARACTERS[answer]?.[ATTRIBUTES.INITIAL_RELEASE]) {
      return year + " ↑";
    } else if (year > CHARACTERS[answer]?.[ATTRIBUTES.INITIAL_RELEASE]) {
      return year + " ↓";
    } else {
      return year;
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>Super Smash Bros. Character Guesser</p>
      </header>
      <div className="App-body">
        <div className="row">
          {Object.values(ATTRIBUTES).map((attribute) => (
            <div className="attribute" key={attribute}>
              {ATTRIBUTE_LABELS[attribute]}
            </div>
          ))}
        </div>

        <div>
          {rows.map((row) => (
            <div className="row" key={row}>
              {cols.map((col) => {
                const answered = guesses[row]?.selectionIndex != undefined;
                const correct =
                  CHARACTERS[guesses[row]?.selectionIndex]?.[
                    ATTRIBUTE_INDEX[col]
                  ] === CHARACTERS[answer]?.[ATTRIBUTE_INDEX[col]];
                const additionalClassName = answered
                  ? correct
                    ? "green"
                    : "red"
                  : "";
                const value =
                  ATTRIBUTE_INDEX[col] === ATTRIBUTES.INITIAL_RELEASE &&
                  answered
                    ? release_year_comparison(
                        CHARACTERS[guesses[row]?.selectionIndex]?.[
                          ATTRIBUTE_INDEX[col]
                        ]
                      )
                    : CHARACTERS[guesses[row]?.selectionIndex]?.[
                        ATTRIBUTE_INDEX[col]
                      ];
                return (
                  <div className={`square ${additionalClassName}`} key={col}>
                    {value}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        <div className="row">
          <Select
            showSearch
            onChange={setSelection}
            defaultValue={0}
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
              return (
                <Select.Option
                  key={i}
                  value={i}
                  label={character[ATTRIBUTES.NAME]}
                >
                  <Space>
                    <span role="img" aria-label="China">
                      👾
                    </span>
                    {character[ATTRIBUTES.NAME]}
                  </Space>
                </Select.Option>
              );
            })}
          </Select>

          <Button type="primary" onClick={handleGuess} disabled={isCorrect}>
            Make Guess
          </Button>
        </div>
        {isCorrect ? (
          <div className="correct_answer">Congrats!</div>
        ) : guesses.length >= NUM_ATTEMPS ? (
          <div className="wrong_answer">
            Sorry, the correct answer was {CHARACTERS[answer]?.name}.
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default App;
