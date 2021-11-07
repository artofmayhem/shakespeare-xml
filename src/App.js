import React, { useEffect, useState } from "react";
import Data from "./Data/alls_well_that_ends_well_ff.xml";
import XMLParser from "react-xml-parser";
import axios from "axios";
import { LinearProgress } from "@material-ui/core";

import "./App.css";

const initialState = {
  character: "",
  length: 1,
  searchResults: [],
};

function App() {
  const [data, setData] = useState();
  const [formValues, setFormValues] = useState(initialState);
  const [searchData, setSearchData] = useState(initialState.searchResults);
  const log = console.log;

  // Data checker
  if (data === undefined) {
    log(">>>>>>>>>>>>>Loading...");
  } else {
    log(">>>>>>>>>>>>>1. PARSED DATA From state: ", data);
  }
  log("2. Search data: ", searchData, "3. Character: ", formValues.character);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevFormValues) => ({ ...prevFormValues, [name]: value }));
  };

  const searchJSON = (formValues, data) => {
    const searchData = [];
    const { character, length } = formValues;
    const foundLines = data.getElementsByTagName("line");
    for (let idx = 1; idx <= length; idx++) {
      log(
        "5. Found Line: ",
        foundLines[idx].value,
        "6. character: ",
        character
      );
      searchData.push(foundLines[idx].value);
    }
    return searchData;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    const valueToUpperCase = value.toUpperCase();
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [name]: valueToUpperCase,
    }));
    setSearchData(searchJSON(formValues, data));
  };

  useEffect(() => {
    axios
      .get(Data, {
        "Content-Type": "application/xml; charset=utf-8",
      })
      .then((res) => {
        const jsonFromXML = new XMLParser().parseFromString(res.data);
        setData(jsonFromXML);
      })
      .catch((err) => {
        log("ERROR", { err });
      });
  }, [log]);

  return (
    <div className="App">
      <nav>
        <h1>All's Well That Ends Well </h1>
        <h3>by William Shakespeare</h3>
      </nav>
      <main className={"input-fields-wrapper"}>
        <div className={"input-fields"}>
          <label htmlFor="length">Number of Lines</label>
          <input
            type="number"
            name="length"
            value={formValues.length}
            className={"text-field"}
            onChange={handleChange}
          />
        </div>
      </main>
      <div className="output-wrapper">
        {data === undefined ? (
          <div className={"linear-progress-container"}>
            <h4>Loading your selection</h4>
            <LinearProgress className={"linear-progress"} />
          </div>
        ) : (
          <div className={"character-values"}>
            <div>
              <h2>Choose the Character</h2>
            </div>
            <div className={"character-values-wrapper"}>
              {data.children[3].children.map((character, idx) => {
                return (
                  <button
                    key={idx}
                    name="character"
                    value={character.children[0].attributes.short}
                    onClick={handleSubmit}
                  >
                    {character.children[0].value}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>{" "}
      <div className={"output-container"}>
        <table>
          <tbody>
            <th>
              {formValues.character === "" ? // <h3>Awaiting Query</h3>
              null : (
                <h3>Character: {formValues.character}</h3>
              )}
            </th>
            {searchData === undefined ? (
              <p>Awaiting Query</p>
            ) : (
              searchData.map((line, idx) => {
                return (
                  <tr key={idx}>
                    <td>
                      Line {idx + 1}: {line}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
