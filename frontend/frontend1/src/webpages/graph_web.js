import React, { useReducer, useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './index.css';
import { VictoryPie, VictoryChart, VictoryGroup, VictoryBar, VictoryTheme, VictoryHistogram, VictoryAxis } from 'victory';
import chroma from "chroma-js";


function generateColorScale(n) {
  return chroma.scale(["tomato", "orange", "gold", "cyan", "navy"]).colors(n);
}

export default function MyPieChart() {

  const isMounted = useRef(false);
  const isMounted2 = useRef(false);
  const isMounted0 = useRef(false);

  //QUESTIONNAIRE 
  const [qids, setQids] = useState([]);
  const [qstnre, setQstnre] = useState([]);

  const [questionnaireID, setQuestionnaireID] = useState([]);

  useEffect(() => {
    const queryParameters = new URLSearchParams(window.location.search)
    setQuestionnaireID(parseInt(queryParameters.get("QuestionnaireID"), 10));
  }, []);

  useEffect(() => {
    if(isMounted0.current){
    axios.get(`http://localhost:9103/inteliq_api/questionnaire/${questionnaireID}`)
    .then(response => {
      setQstnre(response.data);
    })
    .catch(error => {
      console.log(error);
    });}
    else isMounted0.current=true;
  }, [questionnaireID]);
  //QUESTION  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState([]);
  const [qstion, setQstion] = useState([]);

  useEffect(() => {
    if(isMounted2.current){
      console.log(qstnre);
    let newQids = [];
    {qstnre.questions?.map(q => newQids.push(q.qid))}
    console.log(newQids);
    setQids(newQids);}
    else isMounted2.current=true;
  },[qstnre]);

  useEffect(() => {
    if (qids) {
      console.log("qids: " + qids);
      console.log("qids length is " + qids.length);
      setCurrentQuestionIndex(qids[0]);
    }
  }, [qids]);

  useEffect(() => {
    if(isMounted.current){
    console.log("Current Index is " + currentQuestionIndex);
    let url=`http://localhost:9103/inteliq_api/getquestionanswersenhanced/${questionnaireID}/${currentQuestionIndex}`;
    console.log(url);
    axios.get(url)
    .then(response => {
      setQstion(response.data);
      })
    .catch(error => {
      console.log(error);
    });
  }
    else isMounted.current=true;
}, [currentQuestionIndex]);

  const answrs = [];
  {qstion.answers?.map(ans => answrs.push(ans.answer_txt))}

  const handleOnClick = (e) => {
    e.preventDefault();
    let selectedNextQID;
    selectedNextQID = parseInt(currentQuestionIndex)+1;
    console.log("New qid is " + selectedNextQID + " and qids length is " + qids.length);
    if(qids.length < selectedNextQID) selectedNextQID = null;
    setCurrentQuestionIndex(selectedNextQID);
    console.log("New current index is " + selectedNextQID);
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
    console.log("We are at " + currentQuestionIndex);
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
