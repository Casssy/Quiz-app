import React from "react"

export default function Question(props){
    
    ////// VARIABLES/////
    
    const question = props.questionsArray;
    let answers = props.questionsArray.answers;
    
    ///// FUNCTIONS/////
    
    function handleClick(answer){
        if(question.checked){
            return
        } 
        props.handleClickAnswer(props.id, answer)
    }
   
    ////// CREATING ELEMENTS //////
    
    const answerElements = answers.map((answer, index) =>{
        let id = ""
        if(question.checked){
            if(question.correct === answer){
               id="correct" 
            }else if (question.correct !== answer){
                id="incorrect"
            } else {
                id= "not-selected"
            }
        }
        
        return <button 
                    id={id}
                    className= {answer === question.selected ? "answer selected" : "answer"}
                    onClick={() => handleClick(answer)}
                    key={index}
                    >{atob(answer)}
                </button>
    })
    return(
        <div className="question"> 
            <h3> {atob(question.question)}</h3>
            {answerElements}
        </div>
    )
}