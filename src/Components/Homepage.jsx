import React from "react"

export default function Homepage(props){
    return(
        <div className="home"> 
           
            <h1> Quizzical</h1>
            <p> Let's take a quiz!</p>
            <button 
                className="start-btn" 
                onClick={props.start}
                > Start quiz
             </button>
        
        </div>
    )
}