import React, { useState } from "react";
import Autosuggest from "react-autosuggest";
import axios from "axios";
import "./App.css";

const getSuggestionValue = (suggestion) => suggestion.name;

const BuildForm = () => {
  const [formData, setFormData] = useState({
    processor: "",
    motherboard: "",
    graphicsCard: "",
    rams: "",
    drives: "",
    processorId: "",
    motherboardId: "",
    graphicsCardId: "",
    ramsId: "",
    drivesId: "",
  });

  const [suggestions, setSuggestions] = useState([]);
  const [errors, setErrors] = useState([]);

  const checkComplete = async (formData) => {
    // parts: MotherBoards, Processors, VideoCards, RAMs, Drives
    const procMother = await axios.get(
      `http://localhost:4000/check?id1=${formData.processorId}&part1=Processors&id2=${formData.motherboardId}&part2=MotherBoards`
    );
    const procRam = await axios.get(
      `http://localhost:4000/check?id1=${formData.processorId}&part1=Processors&id2=${formData.ramsId}&part2=RAMs`
    );
    const videoMother = await axios.get(
      `http://localhost:4000/check?id1=${formData.graphicsCardId}&part1=VideoCards&id2=${formData.motherboardId}&part2=MotherBoards`
    );
    const driverMother = await axios.get(
      `http://localhost:4000/check?id1=${formData.drivesId}&part1=Drives&id2=${formData.motherboardId}&part2=MotherBoards`
    );
    if (!procMother.data) setErrors([...errors, 'Процессор и материнская плата несовместимы']);
    if (!procRam.data) setErrors([...errors, 'Процессор и оперативная память несовместимы']);
    if (!videoMother.data) setErrors([...errors, 'Видеокарта и материнская плата несовместимы']);
    if (!driverMother.data) setErrors([...errors, 'Накопитель данных и материнская плата несовместимы']);
    if (procMother.data && procRam.data && videoMother.data && driverMother.data) setErrors([...errors, 'Сборка сохранена']);
  }

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSuggestionSelected = (event, { suggestion, name }) => {
    event.preventDefault();
    setFormData({
      ...formData,
      [name]: suggestion.name,
      [`${name}Id`]: suggestion.id,
    });
    setErrors([]);
  };

  const handleSuggestionsFetchRequested = async ({value, name}) => {
    const { data } = await axios.get(
      `http://localhost:4000?part=${name}&input=${value}`
    );
    setSuggestions(data);
  };

  const handleSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const renderSuggestion = (suggestion) => <div className="autosuggest_suggestions-container">{suggestion.name}</div>;
  // MotherBoards, Processors, VideoCards, RAMs, Drives

  const inputPropsProcessor = {
    name: "processor",
    value: formData.processor,
    onChange: handleInputChange,
    placeholder: "Select or enter a processor",
  };

  const inputPropsMotherboard = {
    name: "motherboard", value: formData.motherboard, onChange: handleInputChange, placeholder: "Select or enter a motherboard", };

  const inputPropsGraphicsCard = { name: "graphicsCard", value: formData.graphicsCard, onChange: handleInputChange, placeholder: "Select or enter a graphics card", };
  const inputPropsRams = { name: "rams", value: formData.rams, onChange: handleInputChange, placeholder: "Select or enter a RAM", };
  const inputPropsDrives = { name: "drives", value: formData.drives, onChange: handleInputChange, placeholder: "Select or enter a Drive", };


  return ( <form className="maindiv">
    <div>
      <label htmlFor="processor">Processor</label>
      <div style={{ position: "relative" }}>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={(value) =>
            handleSuggestionsFetchRequested({
              value: value.value,
              name: "Processors",
            })
          }
          onSuggestionsClearRequested={handleSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputPropsProcessor}
          onSuggestionSelected={(e, { suggestion }) =>
            handleSuggestionSelected(e, { suggestion, name: "processor" })
          }
          style={{ zIndex: "999" }}
        />
      </div>
    </div>
    <div>
      <label htmlFor="motherboard">Motherboard</label>
      <div style={{ position: "relative" }}>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={(value) =>
            handleSuggestionsFetchRequested({
              value: value.value,
              name: "MotherBoards",
            })
          }
          onSuggestionsClearRequested={handleSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputPropsMotherboard}
          onSuggestionSelected={(e, { suggestion }) =>
            handleSuggestionSelected(e, { suggestion, name: "motherboard" })
          }
        />
      </div>
    </div>
    <div>
      <label htmlFor="graphicsCard">Graphics Card</label>
      <div style={{ position: "relative" }}>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={(value) =>
            handleSuggestionsFetchRequested({
              value: value.value,
              name: "VideoCards",
            })
          }
          onSuggestionsClearRequested={handleSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputPropsGraphicsCard}
          onSuggestionSelected={(e, { suggestion }) =>
            handleSuggestionSelected(e, { suggestion, name: "graphicsCard" })
          }
        />
      </div>
    </div>
    <div>
      <label htmlFor="rams">RAM</label>
      <div style={{ position: "relative" }}>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={(value) =>
            handleSuggestionsFetchRequested({
              value: value.value,
              name: "RAMs",
            })
          }
          onSuggestionsClearRequested={handleSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputPropsRams}
          onSuggestionSelected={(e, { suggestion }) =>
            handleSuggestionSelected(e, { suggestion, name: "rams" })
          }
        />
      </div>
    </div>
    <div>
      <label htmlFor="drives">Drive</label>
      <div style={{ position: "relative" }}>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={(value) =>
            handleSuggestionsFetchRequested({
              value: value.value,
              name: "drives",
            })
          }
          onSuggestionsClearRequested={handleSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputPropsDrives}
          onSuggestionSelected={(e, { suggestion }) =>
            handleSuggestionSelected(e, { suggestion, name: "drives" })
          }
        />
      </div>
    </div>
    <button onClick={async (event) => {
      event.preventDefault();
      await checkComplete(formData);
    }}>Create Build</button>
    {errors.map((error) => <p>{error}</p>)}
  </form> ); };

export default function App() {
  return (
    <div className="App">
      <BuildForm />
    </div>
  );
}
