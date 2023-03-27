import logo from "./logo.png";
import OptionsForm from "./components/OptionsForm";
import { useState, useEffect }  from "react";
import React from "react";


const App = () => {
  const [numberOfLetters, setNumberOfLetters] = useState(4);
  const [duplicateLetters, setDuplicateLetters] = useState(false);

  return (
  <div className="container">
     <h2><img src={logo}></img></h2>
     {duplicateLetters}
     <OptionsForm 
     numberOfLetters={numberOfLetters} 
     setNumberOfLetters={setNumberOfLetters}
     duplicateLetters={duplicateLetters}
     setDuplicateLetters={setDuplicateLetters}
      >
     </OptionsForm>
  </div>)
};

export default App;