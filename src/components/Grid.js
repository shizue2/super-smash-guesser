import {
    ATTRIBUTES,
    ATTRIBUTE_INDEX,
    ATTRIBUTE_LABELS
} from "../const/attributes";
import { CHARACTERS } from "../const/characters";
import { NUM_ATTEMPS } from "../const/settings";
import { releaseYearFunction } from "../utils/releaseYearFunction";


export function Grid({ answer, guesses }) {

    const rows = Array.from(Array(NUM_ATTEMPS).keys());
    const cols = Array.from(Array(Object.keys(ATTRIBUTES).length).keys());

    return (

        <div>
            <div className="row">
                {Object.values(ATTRIBUTES).map((attribute) => (
                    <div className="attribute" key={attribute}>
                        {ATTRIBUTE_LABELS[attribute]}
                    </div>
                ))}
            </div>
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
                        const showImage = ATTRIBUTE_INDEX[col] === ATTRIBUTES.NAME &&
                            answered


                        const value =
                            ATTRIBUTE_INDEX[col] === ATTRIBUTES.INITIAL_RELEASE &&
                                answered
                                ? releaseYearFunction(
                                    CHARACTERS[guesses[row]?.selectionIndex]?.[
                                    ATTRIBUTE_INDEX[col]
                                    ], answer
                                )
                                : CHARACTERS[guesses[row]?.selectionIndex]?.[
                                ATTRIBUTE_INDEX[col]
                                ];
                        return (
                            <div className={`square ${additionalClassName}`} key={col}>
                                {showImage ? (<img
                                    src={`${process.env.PUBLIC_URL}${CHARACTERS[guesses[row]?.selectionIndex]?.image_url}`}
                                    alt={CHARACTERS[guesses[row]?.selectionIndex]?.[ATTRIBUTE_INDEX[col]]}
                                    className="character-image-column"
                                />) : value}
                            </div>
                        );
                    })}
                </div>
            ))}
        </div>)

}

