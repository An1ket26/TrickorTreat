import './App.css';
import {useState } from "react";
import Rules from "./components/Rules.js"
import Game from "./components/Game.js"


function App() {
  const [GameMode,setGameMode]=useState("Default");
  return (
    <div className="App">
      
     {GameMode==="Default" && <Rules setGameMode={setGameMode}/>}
     {GameMode==="start" && <Game setGameMode={setGameMode} size={10} />}
    </div>
  );
}

export default App;
