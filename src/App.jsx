import React from "react"
import Homepage from "./Components/Homepage"
import Question from "./Components/Question"
import { nanoid } from 'nanoid'

export default function App(){
    
    ///// SETTING STATE //////
    
    const [quiz, setQuiz] = React.useState(false)
    const [allQuestions, setAllQuestions] = React.useState([])
    const [correct, setCorrect] = React.useState(0)
    const [count, setCount] = React.useState(0)
    const [checked, setChecked] = React.useState(false)

    ///// MAKING API CALL //////
    
    const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);    
    
    React.useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=5&type=multiple&encode=base64")
            .then(res => res.json())
            .then(data => {
                let q = []
                data.results.forEach(question =>{
                    q.push({
                        id: nanoid(),
                        question: question.question,
                        answers: shuffleArray([...question.incorrect_answers, question.correct_answer]),
                        correct: question.correct_answer,
                        selected: "",
                        checked: false
                    })
                })
                setAllQuestions(q)
            })
    }, [count])
   
      ///// FUNCTIONS /////
      
    function startQuiz(){
        setQuiz(true)
    }
    
    function handleCheck(){
        let selected = true
       
        for(let i = 0; i < allQuestions.length; i++){
           if(allQuestions[i].selected === ""){
               selected = false
           }
        }
        if(selected){ 
            setAllQuestions(prevQuestion => prevQuestion.map(question => {
            return {...question,
                    checked: true}
            }))
            setChecked(true)
            for(let i =0; i < allQuestions.length; i++){
                if(allQuestions[i].correct === allQuestions[i].selected){
                    setCorrect(prevCorrect => prevCorrect +1 )
                }
            }
        }
    }
    
    function handleClickAnswer(id, answer) {
        setAllQuestions(prevQuestion => prevQuestion.map(question =>{
            return question.id === id ? {...question, selected: answer} : question
        }))
    }
  
    function handlePlayAgain(){
        setCount(prevCount => prevCount + 1)
        setChecked(false)
        setCorrect(0)
    }
  
  //// CREATING ELEMENTS ///////
  
  const questionElements = allQuestions.map((question) => {
        return (<Question 
                    key={question.id} 
                    questionsArray={question}
                    handleClickAnswer={handleClickAnswer}
                    id={question.id}/>)
     })
     
     ///// RETURN ///////

    return(
        <main> 
            <div className="yellow-blob"> </div>
                {
                    quiz
                    ? 
                    <>
                        {questionElements}
                        <div className="score-div"> 
                    
                            {checked && <span className="score"> You scored {correct} /5 correct answers</span>}
                    
                            <button 
                                className="check-btn" 
                                onClick={checked ? handlePlayAgain : handleCheck}
                                >{checked ? "Play again" : "Check Answers" } 
                            </button>
                        </div>
                    </>
                    :
                    <Homepage start={startQuiz} />
                }
                
            <div className="blue-blob"> </div>
            <div className="purple-blob"> </div>
        </main>
        )
} 

