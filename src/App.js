import React, { useState } from "react";
import Autosuggest from "react-autosuggest";
import axios from "axios";

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
  };

  const handleSuggestionsFetchRequested = async ({value, name}) => {
    const { data } = await axios.get(
      `http://localhost:4000?part=${name}&input=${value}`
    );
    console.log(data);
    setSuggestions(data);

  };

  const handleSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const renderSuggestion = (suggestion) => <div>{suggestion.name}</div>;
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


  return ( <form>
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
    <button onClick={(event)=> {
      event.preventDefault();
      console.log(formData);
    }}>Log</button>
    <button type="submit">Create Build</button>
  </form> ); };

export default function App() {
  return (
    <div className="App">
      <BuildForm />
    </div>
  );
}
