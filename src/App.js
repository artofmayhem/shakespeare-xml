import React, { useEffect, useState } from "react";
import Data from "./Data/alls_well_that_ends_well_ff.xml";
import XMLParser from "react-xml-parser";
import axios from "axios";
import { LinearProgress } from "@material-ui/core";

import "./App.css";

const initialState = {
  character: "",
  length: 1,
};

function App() {
  const [data, setData] = useState();
  const [formValues, setFormValues] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevFormValues) => ({ ...prevFormValues, [name]: value }));
  };

  const searchJSON = (formValues, data) => {
    const foundLines = [];
    const searchData = data.children
    const { character, length } = formValues;
    console.log("1. Form Values from handleSubmit call: ", formValues, "2. SEARCH_DATA", searchData[3].children[0].children[1].children[0].attributes.short.toUpperCase(), "3. CHARACTER", character, "4. LENGTH", length); //200 happy path data :)
    for (let idx = 5; idx <= 15; idx++) {
      console.log('Looped search data name ', searchData[idx].children[0].value.toUpperCase());
      if (searchData[3].children[0].children[1].children[0].attributes.short.toUpperCase() === character) {
        foundLines.push(searchData[idx].children[0].value);
        console.log("5. Found character: ", searchData[idx].children[0].value);
        console.log('found data: ', searchData[3].children[0].children[1].children[0].attributes.short.toUpperCase());
        return searchData[idx].children[0].value;
        
      }  
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    const valueToUpperCase = value.toUpperCase();
    setFormValues((prevFormValues) => ({ ...prevFormValues, [name]: valueToUpperCase }));
    searchJSON(formValues, data);
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
        console.log("ERROR", { err });
      });
  }, []);

  // Data checker
  // if (data === undefined) {
  //   console.log(">>>>>>>>>>>>>Loading...");
  // } else {
  //   console.log(">>>>>>>>>>>>>PARSED DATA From state: ", data);
  // }

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
        <h2>Output Container</h2>
      </div>
    </div>
  );
}

export default App;
