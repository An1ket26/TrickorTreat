

const Rules=(props)=>{
    
    return(
        <div className="">
            <div className="RulesContainer">
                <h1 className="heading">Rules</h1>
               <h3>1. Click on Start button to start the Game.</h3>
                <h3>2. Click on Exit button to return to main menu.</h3>
                <h3>3. Click on Reset Button to reset the game to default state.</h3>
                <h3>4. Use the arrow keys to move the player up/down/left/right.</h3>
                <h1 className="enjoy">Enjoy your time here!!!!!!</h1> 
            </div>
            <div className="startBtnContainer">
                <button className="start" onClick={()=>{props.setGameMode("start")}}>Start</button>
            </div>
        </div>
    );    
}

export default Rules;