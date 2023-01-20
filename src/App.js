import React, { useReducer, useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  //QUESTIONNAIRE 
  const [qids, setQids] = useState([]);
  const [qstnre, setQstnre] = useState([]);
  let hasNext = true;

  useEffect(() => {
    axios.get('http://localhost:9103/inteliq_api/questionnaire/1')
    .then(response => {
      setQstnre(response.data);
    })
    .catch(error => {
      console.log(error);
    });
  }, []);

  //QUESTION  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState([]);
  const [qstion, setQstion] = useState([]);

  useEffect(() => {
    console.log(currentQuestionIndex);
    let url=`http://localhost:9103/inteliq_api/question/1/${currentQuestionIndex}`;
    axios.get(url)
    .then(response => {
      setQstion(response.data);
      })
    .catch(error => {
      console.log(error);
    });
}, [currentQuestionIndex]);

  useEffect(() => {
    let newQids = [];
    {qstnre.questions?.map(q => newQids.push(q.qid))}
    setQids(newQids);
    console.log(qids);
    setCurrentQuestionIndex(qids.shift());
  },[qstnre]);

  const opts = [];
  const optids = [];
  const optnexts = [];
  {qstion.options?.map(op => opts.push(op.opttxt))}
  {qstion.options?.map(op => optids.push(op.optID))}
  {qstion.options?.map(op => optnexts.push(op.nextqID))}

  const [hasClicked, setHasClicked] = useState(false);
  //OPTIONS
  const [options, setOptions] = useState([]);
  const handleChange = (e) => {
    const newOptions = {...options};
    Object.keys(newOptions).forEach(key => {
      if (key !== e.target.name) {
        newOptions[key] = false;
      }
    });
    newOptions[e.target.name] = e.target.checked;
    if(e.target.checked === true) setHasClicked(true);
    else setHasClicked(false);
    setOptions(newOptions);
  };

  const handleOnClick = (e) => {
    e.preventDefault();
    handleChange(e);
    const selectedOpt = Object.keys(options).find(key => options[key] === true);
    let selectedOptID = optids[selectedOpt];
    let url=`http://localhost:9103/inteliq_api/doanswer/1/${currentQuestionIndex}/1/${selectedOptID}`;
    axios.post(url);
    let selectedNextQID = optnexts[selectedOpt];
    setCurrentQuestionIndex(selectedNextQID);
  }

  useEffect(() => {
    setOptions(optids.reduce((acc, curr) => {
        acc[curr] = false;
        return acc;
    }, {}));
}, []);

//switch(currentQuestionIndex){
  if(currentQuestionIndex != null){
    return(       
      <div className="wrapper">
        <h1 key={qstnre.questionnaireTitle}><strong>{qstnre.questionnaireTitle}</strong>
        </h1>

        <form>
          <fieldset>
            <label>
              <p><strong>{qstion.qtext}</strong></p>
            </label>
          </fieldset>

          <div>
              {opts.map((opt, idx) => (
                <fieldset>
                <label key={idx}>
                  <input
                    type="checkbox"
                    name={idx}
                    onChange={handleChange}
                    checked={options[idx] || false}
                  />
                  {opt}
                </label>
                </fieldset>
              ))}
            </div>
            <button disabled = {hasClicked ? false : true} onClick={(e) => handleOnClick(e)}>Next </button>
        </form>
      </div>
      );}
  else
  return(<div>Thank you for submitting!</div>)


  }

export default App;