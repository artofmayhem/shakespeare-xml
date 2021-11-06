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
    // searchJSON(value);
    console.log(`name: ${name}, value: ${value}`);
    setFormValues((prevFormValues) => ({ ...prevFormValues, [name]: value }));
  };

  //query will be the character name and the amount of lines to return
  // this will be coming from the form and querying the data in state

  // the character data looks like this:
  // <persona gender="male">
  // <persname short="LAF.">Lafew</persname>
  // <persaliases>
  // 	<persname short="Ol.Laf."/>
  // 	<persname short="Lafew."/>
  // 	<persname short="L.Laf."/>
  // 	<persname short="Old Laf."/>
  // 	<persname short="Laf."/>
  // 	<persname short="La."/>
  // 	<persname short="La"/>
  // 	<persname short="Old La."/>
  // 	<persname short="Ol.Lord"/>
  // </persaliases>
  // </persona>

  // the likes data looks like this:
  //   <speech>
  // <speaker>Laf.</speaker>
  // <line globalnumber="7" number="7">You &#383;hall find of the King a husband Madame,</line>
  // <line globalnumber="8" number="8">you &#383;ir a father. He that &#383;o generally is at all times good,</line>
  // <line globalnumber="9" number="9">mu&#383;t of nece&#383;&#383;itie hold his vertue to you, who&#383;e worthi&#160;&#8212;</line>
  // <line globalnumber="10" number="10">ne&#383;&#383;e would &#383;tirre it vp where it wanted rather then lack</line>
  // <line globalnumber="11" number="11">it where there is &#383;uch abundance.</line>
  // </speech>

  // will need to search persaliases for the name and then search the speech and return the required number of lines

  //function may look like this:
  function searchJSON(formValues) {
    axios
      .get(Data, {
        "Content-Type": "application/xml; charset=utf-8",
      })
      .then((res) => {
        const data = res.data;
        const foundCharacter = data.filter(
          (character) => character.name === foundCharacter
        );
        const foundLines = foundCharacter.slice(0, formValues.length);
        console.log(
          ">>>>>found character: ",
          foundCharacter,
          "found lines: ",
          foundLines
        );
      })
      .catch((err) => console.log({ err }));
  }

  useEffect(() => {
    axios
      .get(Data, {
        "Content-Type": "application/xml; charset=utf-8",
      })
      .then((res) => {
        const jsonFromXML = new XMLParser().parseFromString(res.data);
        setData(jsonFromXML);
        // console.log("PARSED res.data: ", jsonFromXML);
      })
      .catch((err) => {
        console.log("ERROR", { err });
      });
  }, []);

  // Data checker
  if (data === undefined) {
    console.log(">>>>>>>>>>>>>Loading...");
  } else {
    console.log(">>>>>>>>>>>>>DATA From state: ", data.children);
  }

  return (
    <div className="App">
      <nav>
        <h1>All's Well That Ends Well </h1>
        <h3>by William Shakespeare</h3>
      </nav>
      <main className={"input-fields-wrapper"}>
        <div className={"input-fields"}>
          <label htmlFor="character">Character</label>
          <input
            type="text"
            name="character"
            value={formValues.character}
            className={"text-field"}
            onChange={handleChange}
          />
          <label htmlFor="length">Length</label>
          <input
            type="number"
            name="length"
            value={Number(formValues.length)}
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
          <div>
            <h3>Parsed data is 200 for use</h3>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
