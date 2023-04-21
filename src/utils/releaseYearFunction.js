import { ATTRIBUTES } from "../const/attributes";
import {CHARACTERS} from "../const/characters";


export function releaseYearFunction(year, answer) {
    if (year < CHARACTERS[answer]?.[ATTRIBUTES.INITIAL_RELEASE]) {
      return year + " ↑";
    } else if (year > CHARACTERS[answer]?.[ATTRIBUTES.INITIAL_RELEASE]) {
      return year + " ↓";
    } else {
      return year;
    }
  }

