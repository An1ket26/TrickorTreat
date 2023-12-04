import {useState,useEffect, lazy, Suspense} from "react";
import "./Game.css"

const BackgroundAudio = lazy(() => import('./BackGroundAudio'));

const Game=(props)=>{
    const [userPos,setUserPos]=useState({'x':props.size/2,'y':props.size/2});
    const [moves,setMoves]=useState(0);
    const [chocoPos,setChocoPos]=useState([]);
    const [totalChoco,setTotalChoco]=useState(0);
    const updateChoco=(x,y)=>{
        var filtered= chocoPos.filter(choco=>choco.x===x-1 &&choco.y===y-1 && choco.status==='n');
        if(filtered.length>0)
        {
            setChocoPos(chocoPos.map((choco)=>{return (choco.x===x-1 &&choco.y===y-1)?{...choco,status:'p'}:choco}))
            setTotalChoco((prev)=>prev-1);
        }
        
    }
    const handleDown=()=>{
        if(userPos.x===10)
        {
            return;
        }else{
            updateChoco(userPos.x+1,userPos.y);
            setUserPos({'y':userPos.y,'x':userPos.x+1});
            setMoves((prev)=>prev+1)
        }
    }
    const handleUp=()=>{
        if(userPos.x===1)
        {
            return;
        }else{
            updateChoco(userPos.x-1,userPos.y);
            setUserPos({'y':userPos.y,'x':userPos.x-1});
            setMoves((prev)=>prev+1)
        }
    }
    const handleLeft=()=>{
        if(userPos.y===1)
        {
            return;
        }else{
            updateChoco(userPos.x,userPos.y-1);
            setUserPos({'y':userPos.y-1,'x':userPos.x});
            setMoves((prev)=>prev+1)
        }
    }
    const handleRight=()=>{
        if(userPos.y===10)
        {
            return;
        }else{
            updateChoco(userPos.x,userPos.y+1);
            setUserPos({'y':userPos.y+1,'x':userPos.x});
            setMoves((prev)=>prev+1)
        }
    }
    const handleMove=(e)=>{
        if(e.keyCode ===37)
        {
            handleLeft();
        }
        else if(e.keyCode ===38)
        {
            handleUp();
        }
        else if(e.keyCode ===39)
        {
            handleRight();
        }
        else if(e.keyCode ===40)
        {
            handleDown();
        }
        else{
            return;
        }
    }

    const generateChocoPos=(size)=>{
        var chocoYpos=[];
        for(let i=0;i<size;i++)
        {
            var noOfChoco = Math.floor(Math.random()*size)
            chocoYpos.push(noOfChoco);
        }
        var chocoPosNet=[];
        for(let i=0;i<size;i++)
        {
            // var x = size/chocoYpos[i]
            for( let j=0;j<size;j++)
            {
                // if((j+1)%x===0)
                // {
                //     chocoPosNet.push({'x':i,'y':j,'status':'n'})
                // }
                if(chocoYpos[i]===j)
                {
                    chocoPosNet.push({'x':i,'y':j,'status':'n'})
                }
            }
        }
        setChocoPos(chocoPosNet);
        setTotalChoco(chocoPosNet.length);
    }
    const generatePlayGround=()=>{
        var size=props.size;
        var groundTemplate='<table>';
        for(let i=0;i<size;i++)
        {
            groundTemplate+='<tr>'
            for(let j=0;j<size;j++)
            {
                
                var filteredArray = chocoPos.filter((val)=>val.x===i && val.y===j && val.status==='n')
                if(i+1===userPos.x && j+1===userPos.y)
                {
                    groundTemplate+='<td class="user"></td>'
                }else if(filteredArray.length>0){
                    groundTemplate+='<td class="choco"></td>'
                }else{
                    groundTemplate+='<td class="normal"></td>'
                }
            }
            groundTemplate+='</tr>'
        }
        groundTemplate+='</table>'
        return groundTemplate;
    }
    
    const handleReset=()=>{
        setUserPos({'x':props.size/2,'y':props.size/2});
        setMoves(0);
        setChocoPos([]);
        setTotalChoco(0);
        generateChocoPos(props.size);
    }

    useEffect(()=>{
        generateChocoPos(props.size);
    },[props.size])
    return(
       
        <div onKeyDown={handleMove} tabIndex="0" style={{outline: "none" }}> 
        <Suspense fallback={<div>Loading...</div>}>
            <BackgroundAudio />
        </Suspense>
            {totalChoco>0 &&<><div className="btnContainer">
                <button onClick={()=>props.setGameMode("Default")} className="exit">Exit</button>
                <button onClick={handleReset} className="reset">Reset</button>
            </div>
            <div dangerouslySetInnerHTML={{__html:generatePlayGround(props.size)}}></div>
            <h1 style={{marginLeft:"40%"}}>Moves : {moves}</h1></>}
            {totalChoco===0 && <div className="result"> 
                <h1 style={{marginLeft:"14%"}}>Congrats!!!!!!!</h1>
                <h1>You have completed Game in {moves} moves</h1>
                <button onClick={handleReset} className="reset" style={{marginLeft:"13%"}}>Restart</button>
                <button onClick={()=>props.setGameMode("Default")} className="exit">Exit</button>
            </div>}
        </div>
    );
}

export default Game;