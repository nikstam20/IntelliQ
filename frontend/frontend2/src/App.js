import React, { useReducer, useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './App.css';
import { VictoryPie, VictoryChart, VictoryGroup, VictoryBar, VictoryTheme, VictoryHistogram, VictoryAxis } from 'victory';
import chroma from "chroma-js";


function generateColorScale(n) {
  return chroma.scale(["tomato", "orange", "gold", "cyan", "navy"]).colors(n);
}

export default function MyPieChart() {

  //QUESTIONNAIRE 
  const [qids, setQids] = useState([]);
  const [qstnre, setQstnre] = useState([]);

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
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState([1]);
  const [qstion, setQstion] = useState([]);

  useEffect(() => {
    let url=`http://localhost:9103/inteliq_api/getquestionanswers/1/${currentQuestionIndex}`;
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
    setCurrentQuestionIndex(qids.shift());
  },[qstnre]);

  const answrs = [];
  {qstion.answers?.map(ans => answrs.push(ans.answer_txt))}

  const handleOnClick = (e) => {
    e.preventDefault();
    let selectedNextQID;
    selectedNextQID = parseInt(currentQuestionIndex)+1;
    if(qids.length < selectedNextQID) selectedNextQID = null;
    setCurrentQuestionIndex(selectedNextQID);
  }

//unique answertxt = key, number of times = value 
  let count = answrs.reduce(function(acc, curr) {
    acc[curr] = acc[curr] ? acc[curr] + 1 : 1;
    return acc;
  }, {});
  console.log(count);
  const ansData = Object.entries(count).map(([x, y]) => ({ x, y }));
  console.log(ansData);

  if(currentQuestionIndex !== null){
    return (
      <div className="wrapper">
        <h1 key={qstnre.questionnaireTitle}><strong>{qstnre.questionnaireTitle}</strong></h1>
        <fieldset>
          <label>
            <p><strong>{qstion.qtext}</strong></p>
          </label>
        </fieldset>

        <div style={{width: '200px', height: '200px', overflow: 'hidden'}}>
          <VictoryPie
            animate={{
              duration: 1000
            }}
            tooltip={"dshv"}
            colorScale={generateColorScale(ansData.length)}
            data={ansData}
          />
        </div>
        <div style={{width: '200px', height: '200px', overflow: 'hidden'}}>
          <VictoryHistogram
            data={ansData}
          />
        </div>

        <button  onClick={(e) => handleOnClick(e)}>Next </button>
        </div>
    );
  }
  else return (<div>That's all.</div>);
}
