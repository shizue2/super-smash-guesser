import { Button, Select } from "antd";
import React, { useMemo, useState } from "react";
import { ATTRIBUTES } from "../const/attributes";
import { NUM_ATTEMPS } from "../const/settings";
import { CHARACTERS } from "../const/characters";

function CharacterSelection({ isCorrect, guesses, addGuess }) {
  const [selection, setSelection] = useState();

  const filteredCharacters = useMemo(() => {
    return CHARACTERS.filter((character) => !guesses.includes(character.id));
  }, [guesses]);

  return (
    <div className="row">
      <Select
        showSearch
        onChange={setSelection}
        style={{ width: 240 }}
        filterOption={(input, option) => {
          return (option?.label ?? "")
            .toLowerCase()
            .includes(input.toLowerCase());
        }}
        optionLabelProp="label"
      >
        {filteredCharacters.map((character) => {
          const imageUrl = `${process.env.PUBLIC_URL}${character.image_url}`;
          return (
            <Select.Option
              key={character.id}
              value={character.id}
              label={character[ATTRIBUTES.NAME]}
            >
              <div className="character-option">
                <img
                  src={imageUrl}
                  className="character-image"
                  alt={character[ATTRIBUTES.NAME]}
                />
                <span className="character-name">
                  {character[ATTRIBUTES.NAME]}
                </span>
              </div>
            </Select.Option>
          );
        })}
      </Select>
      <Button
        type="primary"
        onClick={() => addGuess(selection)}
        disabled={
          isCorrect || guesses.length >= NUM_ATTEMPS || selection == undefined
        }
      >
        Make Guess
      </Button>
    </div>
  );
}

export default CharacterSelection;
