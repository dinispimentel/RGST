// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

// document.getElementById("avg").innerHTML = "-";

// const lineReader = require('line-reader');

document.getElementById("dbg").innerHTML = "1";
// const lineReader = require('lineReader');
const fs = require('fs');
const { get } = require('https');

/*
  GLOBAIS
*/


/*
  ERROR CODES: 
  1 - Carregou Ficheiro
  2 - Começou a contar
  3 - A pegar contagem de Sg
  4 - Checkando isFarmStarted
  5 - Pegando Contagem atual de SG
*/ 

SGS = 0


isFarmStarted = false
segs_spent = 2
firstSgCount = 0


startTime = 0

actualTime = 0


setTimeout(function () {
  getSgCount()
  firstSgCount = SGS
}, 1000)



getSgCount()
actualFarmedSg = SGS
firstSgCount = 0
initedSgOnFarm = false

/*
  Funções Globais
*/

// Calculo do AVG/MIN: Tempo (60 segs) a dividir pelas Sg's 
// Calculo Sg's por segundo por todo o tempo: Segundos a dividir pelas SG's
function getSgCount() {
  // document.getElementById("dbg").innerHTML = "3"
  var numberPattern = /\d+/g;
  
  fs.readFile("../../live/SavedVariables/DPDP.lua", (error, data) => {
    if(error) {
        document.getElementById("dbg").innerHTML = "ERRO!";
        throw error;
    }
    num_sgs = data.toString().match( numberPattern );
    console.log("Num: " + num_sgs.toString());
    dados = data.toString().match( numberPattern );
    setSgCount(data.toString().match( numberPattern ));
    // console.log(data.toString());
  }); 
  

}

function getInitialSgOnFarm() {
  return firstSgCount
}

function getActualTime() {
  return Math.floor(Date.now()/1000)
}

function getSegsSpent() {
  return segs_spent
}

function getStartTime() {
  return startTime
}

function setSgCount( value ) {
  SGS = value
}

function setActualFarmedSgs( value ) {
  console.log(value.toString())
  actualFarmedSg = value
}

function setActualTime( value ) {
  actualTime = value
}

function setStartTime ( value ) {
  startTime = value
}

function setSgsSpent ( value ) {
  segs_spent = value
}

function setInitSgsOnFarm ( value ) {
  if (initedSgOnFarm == false) {
    firstSgCount = value
    setInitedSgsOnFarm(true)
  }
}
function setInitedSgsOnFarm( value ) {
  initedSgOnFarm = value
}

function avgMin() {
  var ss = getSegsSpent()
  var aFsg = getActualFarmedSgs()
  var mins_spent = ss/60;
  var avg_sgs_min = aFsg/mins_spent;
  return avg_sgs_min;
}

function avgSeg() {
  var ss = getSegsSpent()
  var aFsg = getActualFarmedSgs()
  var avg_sgs_seg = aFsg/ss;
  return avg_sgs_seg;
}

function updateAvgMinValue( value ) {
  document.getElementById("avgmin").innerHTML = value.toString();
}

function updateAvgSegValue( value ) {
  document.getElementById("avgseg").innerHTML = value.toString();
}

function updateSegs( value ) {
  document.getElementById("segs").innerHTML = value.toString();
}

setInterval(function () {
    if (isFarmStarted == false) {
      checkFarming();
    }
}, 3500)

function checkFarming() {
    console.log("Verificando Farm");
    document.getElementById("dbg").innerHTML = "4";
    getSgCount()
    let sgs_right_now = SGS
    console.log("Comparacao: " + firstSgCount.toString() + " < " + sgs_right_now.toString());
    if (firstSgCount < sgs_right_now){
      getSgCount()
      //setInitSgsOnFarm(SGS)
      isFarmStarted = true;   
      setStartTime(Math.floor(Date.now()/1000)); //unix timestamp in seconds
        // Verificar se já começou a farmar ; Acrescentar +5 segs de tela de loading

    }
}




function ifStartedUpdate() {
  if ( isFarmStarted == true) {
    

    setInterval(function () {
      getSgCount();
      var atlSgCtd = SGS 
      var atlInitSgOnFarm = getInitialSgOnFarm();
      console.log("Initial SGS: " + atlInitSgOnFarm.toString())
      //console.log("SGS: " + atlInitSgOnFarm.toString())
      setActualFarmedSgs(atlSgCtd - atlInitSgOnFarm);
      setActualTime(Math.floor(Date.now()/1000)); //unix timestamp in seconds
      atlTime = getActualTime();
      strtTime = getStartTime();
      setSgsSpent(atlTime - strtTime);

      updateAvgMinValue(avgMin().toString());
      updateAvgSegValue(avgSeg().toString());
      updateSegs(getSegsSpent());
    }, 1000)

  }
}

function getActualFarmedSgs() {
  return actualFarmedSg
}


setInterval(function () {
  // const fs = require("fs");
  
  // document.getElementById("avg").innerHTML = "B";
  document.getElementById("dbg").innerHTML = "5"

  getSgCount()  // Refresh SGS Count
  actualSgCounted = SGS;

  var aFsgs = getActualFarmedSgs()

  console.log("Atl SG: " + actualSgCounted);
  console.log("AtlF SG: " + aFsgs);
  if (isFarmStarted == true) {
    console.log("Farming? True");
    ifStartedUpdate()
  } else {
    console.log("Farming?: False");
  }
  
  
  /*
  "../live/SavedVariables/DPDP.lua"
  "C:\\Users\\dinis\\Documents\\Elder Scrolls Online\\live\\SavedVariables\\DPDP.lua"
  */


  // __dirname means relative to script. Use "./data.txt" if you want it relative to execution path.
  /*
  fs.readFile("../live/SavedVariables/DPDP.lua", (error, data) => {
      if(error) {
          document.getElementById("avg").innerHTML = "ERRO!";
          throw error;
      }
      document.getElementById("avg").innerHTML = data.toString();
      // console.log(data.toString());
  }); 

  */

}, 5000); 

